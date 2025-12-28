import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

import keys from "./cfg/keys.js";

const FIGMA_API_KEY = keys.API;
const FILE_KEY = keys.FILE;
const PAGES = keys.PAGES;
const FRAMES_TO_EXTRACT = keys.FRAMES_TO_EXTRACT;

console.log("Фреймы", FRAMES_TO_EXTRACT);

const IMAGE_DIR = "assets/generated/images/";
const ICON_DIR = "assets/generated/icons/";
const existingHashes = new Set();

const __filename = fileURLToPath(import.meta.url);

// top-level frames/devices/pages to ignore when determining section
const TOP_EXCLUDE = [
  "tablet",
  "mobile",
  "phone",
  "desktop",
  "главная_страница",
  "home",
  "page",
  "block",
  "active",
  "popup",
  "mob",
];

function clearDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
  fs.mkdirSync(directory, { recursive: true });
}

// Очистка папок перед загрузкой
clearDirectory(IMAGE_DIR);
clearDirectory(ICON_DIR);

const DEFAULT_TIMEOUT = 30000; // ms
const DEFAULT_RETRIES = 4;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * fetchWithRetry: robust fetch with retries + timeout implemented via Promise.race.
 * Compatible with environments where AbortController may be absent.
 */
async function fetchWithRetry(url, options = {}, retries = DEFAULT_RETRIES, timeout = DEFAULT_TIMEOUT) {
  let attempt = 0;
  const backoffBase = 500;

  while (attempt <= retries) {
    attempt++;
    try {
      const fetchPromise = fetch(url, options);
      const timeoutPromise = new Promise((_, rej) => {
        const t = setTimeout(() => {
          clearTimeout(t);
          rej(new Error(`timeout ${timeout}ms`));
        }, timeout);
      });

      const res = await Promise.race([fetchPromise, timeoutPromise]);
      if (!res || !res.ok) {
        const statusText = res && res.statusText ? res.statusText : "no-response";
        throw new Error(`HTTP ${res && res.status ? res.status : "?"} ${statusText}`);
      }
      return res;
    } catch (err) {
      const msg = err && err.message ? err.message : String(err);
      console.warn(`⚠️ Fetch failed (attempt ${attempt}) ${url} — ${msg}`);
      if (attempt > retries) {
        console.error(`❌ All retries failed for ${url}`);
        throw err;
      }
      const wait = backoffBase * attempt;
      console.warn(`   retrying in ${wait}ms...`);
      await sleep(wait);
    }
  }
}

async function fetchFigmaData() {
  const response = await fetchWithRetry(`https://api.figma.com/v1/files/${FILE_KEY}`, {
    headers: { "X-Figma-Token": FIGMA_API_KEY },
  });
  if (!response || !response.ok) return null;
  return response.json();
}

function findPage(document, pageName) {
  if (!document || !Array.isArray(document.children)) return null;
  if (!pageName) return document.children[0] || null;
  return document.children.find((page) => String(page.name) === String(pageName)); // Точное совпадение с учетом эмодзи
}

// helper: считают, является ли имя техническим/дефолтным
function isTechnicalName(name) {
  if (!name) return true;
  const trimmed = String(name).trim();
  if (trimmed.length === 0) return true;
  if (trimmed.length <= 2) return true; // слишком короткое

  const techRe =
    /^(rect|rectangle|frame|group|instance|component|vector|slice|boolean|line|oval|button|image|layer|tile|grid|path|shape|variant|property)\b/i;
  if (techRe.test(trimmed)) return true;

  if (/^(layer|image|rectangle|rect|oval|group|frame)\s*\d+$/i.test(trimmed)) return true;
  if (/^\d+$/.test(trimmed)) return true;

  return false;
}

// определяем, является ли имя page/device/frame, которые нужно пропускать при выборе секции
function isPageOrDeviceName(name) {
  if (!name) return true;
  const s = String(name).trim().toLowerCase();
  if (!s) return true;
  if (TOP_EXCLUDE.includes(s)) return true;
  if (/страниц|страница/.test(s)) return true;
  if (/\b(page|home|landing)\b/.test(s)) return true;
  return false;
}

// нормализуем ключ секции в slug-like (lowercase, underscores)
function normalizeSectionKey(raw) {
  if (!raw) return null;
  return (
    String(raw)
      .trim()
      // .replace(/\s+/g, "_") // Заменяем пробелы на подчёркивания
      .replace(/[^A-Za-z0-9\u0400-\u04FF\u2000-\u2BFF_]+/g, "") // Сохраняем буквы, цифры, кириллицу, эмодзи (диапазон \u2000-\u2BFF включает эмодзи)
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .toLowerCase()
  );
}

function sanitizeFileName(name) {
  return name
    .replace(/[\/\\?%*:|"<>]/g, "_")
    .replace(/\s*\/\s*/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .trim();
}

// поиск ближайшего текстового соседа внутри родителя (по индексу, ищем наружу)
function findSiblingText(node, parent) {
  if (!parent || !parent.children || !Array.isArray(parent.children)) return null;
  const children = parent.children;
  const idx = children.findIndex((c) => c.id === node.id);
  if (idx === -1) return null;

  for (let dist = 1; dist < children.length; dist++) {
    const left = idx - dist;
    const right = idx + dist;
    const candLeft = left >= 0 ? children[left] : null;
    const candRight = right < children.length ? children[right] : null;

    for (const cand of [candLeft, candRight]) {
      if (!cand) continue;
      if (cand.type === "TEXT" && cand.characters) {
        let txt = cand.characters.replace(/\s+/g, " ").trim();
        if (txt.length >= 3 && !/^\d+$/.test(txt)) {
          if (txt.length > 20) {
            txt = txt.split(/\s+/).slice(0, 2).join("_").toLowerCase();
          }
          return txt;
        }
      }
      if ((cand.type === "FRAME" || cand.type === "GROUP") && cand.children) {
        const textChild = cand.children.find(
          (ch) => ch.type === "TEXT" && ch.characters && ch.characters.trim().length >= 3
        );
        if (textChild) {
          let txt = textChild.characters.replace(/\s+/g, " ").trim();
          if (txt.length > 20) {
            txt = txt.split(/\s+/).slice(0, 2).join("_").toLowerCase();
          }
          return txt;
        }
      }
    }
  }
  return null;
}

// Формирует имя файла из пути родителей и имени узла
function buildImageName(
  nodeName,
  parentPath = [],
  maxParts = 3,
  excludeNames = [],
  pageName = "",
  nodeId = "",
  index = 0,
  parent = null
) {
  const pathParts = parentPath
    .map((p) => (p ? String(p).trim() : ""))
    .filter(Boolean)
    .filter((p) => !excludeNames.includes(String(p).toLowerCase()));

  // Определяем секцию
  const section = findSectionNameFromPath(pathParts, excludeNames) || "generic";

  // Детектируем компонент
  const componentMatch = pathParts.find((p) => /^(slider|carousel|card|button|picture|icon)$/i.test(p));
  const component = componentMatch ? componentMatch.toLowerCase() : nodeId.includes("vector") ? "icon" : "picture";

  // Обрабатываем имя узла
  let cleanedNodeName = nodeName && nodeName.trim() ? nodeName : "image";
  if (isTechnicalName(cleanedNodeName) || /^[\d\s]+$/.test(cleanedNodeName)) {
    const siblingText = findSiblingText({ id: nodeId }, parent);
    if (siblingText && siblingText.length >= 3) {
      cleanedNodeName = siblingText.replace(/\s+/g, "_").toLowerCase();
    } else {
      cleanedNodeName = `index_${index}`;
    }
  } else {
    cleanedNodeName = cleanedNodeName
      .replace(/(\d+х\d+)/i, "size_$1") // Сохраняем размеры
      .replace(/(мм|см|л|накладная|для|с|из|х)$/i, "") // Удаляем лишние слова
      .replace(/[\s\-_:]+/g, "_")
      .replace(/_+/g, "_")
      .trim();
  }

  // Формат: section__component__name_index
  const meaningful = [section, component, cleanedNodeName]
    .filter(Boolean)
    .map((p) => normalizeSectionKey(p))
    .filter((p, i, arr) => arr.indexOf(p) === i); // Удаляем дубли

  if (meaningful.length === 0) meaningful.push("image");
  return `${meaningful.join("__")}_${index}`;
}

// Модифицированная compactImageName
function compactImageName(raw, component = null) {
  if (!raw) return "image";
  let tokens = raw
    .toLowerCase()
    .split(/[^A-Za-z0-9\u0400-\u04FF]+/)
    .filter(Boolean)
    .slice(0, 3); // Ограничиваем до 3 токенов (section, component, name)

  // Сохраняем размеры
  tokens = tokens.map((t) => (t.match(/^\d+х\d+$/) ? `size_${t}` : t));

  // Удаляем лишние слова
  const stopWords = ["мм", "см", "л", "накладная", "для", "с", "из", "х"];
  tokens = tokens.filter((t) => !stopWords.includes(t));

  // Сохраняем секцию как первый токен
  const section = tokens[0] || "generic";
  const componentTokens = tokens.slice(1).filter((t) => !isTechnicalName(t) && !/^\d+$/.test(t));
  let name = componentTokens.join("_") || "image";

  if (component && !tokens.includes(component)) name = `${section}_${component}_${name}`;
  else name = `${section}_${name}`;
  return name.replace(/_+/g, "_").replace(/^_|_$/g, "");
}

/* ---------- dedupe helpers ---------- */

function dedupeById(arr) {
  const seen = new Set();
  const out = [];
  for (const it of arr) {
    if (!it || !it.id) continue;
    if (seen.has(it.id)) continue;
    seen.add(it.id);
    out.push(it);
  }
  return out;
}

function dedupeByNameKey(arr) {
  const map = new Map();
  for (const it of arr) {
    if (!it) continue;
    const key = sanitizeFileName(compactImageName(it.name || it.nodeName || ""));
    if (!map.has(key)) {
      map.set(key, it);
      continue;
    }
    const prev = map.get(key);
    const prevTech = isTechnicalName(prev.nodeName || "");
    const curTech = isTechnicalName(it.nodeName || "");
    if (prevTech && !curTech) {
      map.set(key, it);
    }
  }
  return Array.from(map.values());
}

function dedupeSectionsText(sectionsText) {
  const out = {};
  for (const [key, arr] of Object.entries(sectionsText || {})) {
    const seen = new Set();
    const list = [];
    for (const s of arr || []) {
      if (seen.has(s)) continue;
      seen.add(s);
      list.push(s);
    }
    out[key] = list;
  }
  return out;
}

function transformSectionsToJS(sectionsText) {
  const out = {};
  for (const [pageName, pageSections] of Object.entries(sectionsText || {})) {
    out[pageName] = {};
    for (const [sectionKey, arr] of Object.entries(pageSections || {})) {
      out[pageName][sectionKey] = {
        text: Array.isArray(arr) ? arr : [],
        images: [{ name: "example_image", ext: "png" }],
      };
    }
  }
  return out;
}

/* ---------- выбор секции по parentPath/sibling ---------- */

function findSectionNameFromPath(parentPath = [], excludeNames = []) {
  if (!Array.isArray(parentPath) || parentPath.length === 0) return null;
  for (let i = parentPath.length - 1; i >= 0; i--) {
    const p = parentPath[i];
    if (!p) continue;
    if (isPageOrDeviceName(p)) continue;
    if (!isTechnicalName(p)) return normalizeSectionKey(p);
    const cleaned = String(p)
      .replace(
        /^(rect|rectangle|oval|ellipse|image|shape|path|line|vector|group|frame|component|instance)\b[\s\-_:]*/i,
        ""
      )
      .replace(/[\s\-_:]*\d+$/i, "")
      .trim();
    if (cleaned && !isTechnicalName(cleaned) && !isPageOrDeviceName(cleaned)) return normalizeSectionKey(cleaned);
  }
  return null;
}

/* ---------- tree extraction ---------- */

function extractData(
  node,
  parent = null,
  parentPath = [],
  sectionsText = {},
  images = [],
  vectors = [],
  seenImageIds = new Set(),
  seenVectorIds = new Set(),
  excludeNames = [],
  pageName = "",
  imageIndex = 0,
  vectorIndex = 0
) {
  if (!node) return { sectionsText, images, vectors };

  // TEXT nodes
  if (node.type === "TEXT" && node.characters) {
    let cleanedText = node.characters.replace(/\s+/g, " ").trim();
    if (cleanedText.length >= 3) {
      let section = findSectionNameFromPath(parentPath);
      if (!section) {
        if (parent && parent.name && !isPageOrDeviceName(parent.name) && !isTechnicalName(parent.name)) {
          section = normalizeSectionKey(parent.name);
        }
      }
      if (!section) section = "no-section";

      if (!sectionsText[section]) sectionsText[section] = [];
      sectionsText[section].push(cleanedText);
    }
  }

  // image fills
  if (node.fills) {
    for (const fill of node.fills) {
      if (fill && fill.type === "IMAGE" && fill.imageRef && !seenImageIds.has(node.id)) {
        const imageName = buildImageName(
          node.name || "",
          parentPath,
          3,
          excludeNames,
          pageName,
          node.id,
          imageIndex,
          parent
        );
        images.push({ id: node.id, name: imageName, nodeName: node.name || "", parentPath });
        seenImageIds.add(node.id);
        imageIndex++;
      }
    }
  }

  // vectors/icons
  if (["FRAME", "GROUP", "COMPONENT_SET", "SECTION"].includes(node.type)) {
    const hasVector = node.children && node.children.some((child) => child.type === "VECTOR" || child.type === "GROUP");
    if (
      hasVector &&
      node.absoluteBoundingBox &&
      node.absoluteBoundingBox.width <= 300 &&
      node.absoluteBoundingBox.height <= 300 &&
      !seenVectorIds.has(node.id)
    ) {
      const iconName = buildImageName(
        node.name || "",
        parentPath,
        3,
        excludeNames,
        pageName,
        node.id,
        vectorIndex,
        parent
      );
      vectors.push({ id: node.id, name: iconName, nodeName: node.name || "", parentPath });
      seenVectorIds.add(node.id);
      vectorIndex++;
    }
  }

  if (node.children) {
    const nextPath = parentPath.concat(node.name || "");
    for (const child of node.children) {
      extractData(
        child,
        node,
        nextPath,
        sectionsText,
        images,
        vectors,
        seenImageIds,
        seenVectorIds,
        excludeNames,
        pageName,
        imageIndex,
        vectorIndex
      );
    }
  }
  return { sectionsText, images, vectors };
}

function extractTextFromPage(page, excludeNames = []) {
  const { sectionsText } = extractData(page, null, [], {}, [], [], new Set(), new Set(), excludeNames);
  return sectionsText;
}

function extractImagesFromPage(page, excludeNames = []) {
  const { images } = extractData(page, null, [], {}, [], [], new Set(), new Set(), excludeNames);
  return images;
}

function extractIconsFromPage(page, excludeNames = []) {
  const { vectors } = extractData(page, null, [], {}, [], [], new Set(), new Set(), excludeNames);
  return vectors;
}

/* ---------- network + download ---------- */

async function fetchImageUrls(imageIds, format = "png") {
  if (!imageIds || imageIds.length === 0) return {};
  const ids = imageIds.map((img) => img.id).join(",");
  const response = await fetchWithRetry(`https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=${format}`, {
    headers: { "X-Figma-Token": FIGMA_API_KEY },
  });
  if (!response || !response.ok) {
    console.error("❌ Ошибка при получении ссылок на изображения:", response && response.statusText);
    return {};
  }
  const data = await response.json();
  return data.images || {};
}

async function fetchSvgUrls(vectorIds) {
  if (!vectorIds || vectorIds.length === 0) return {};
  const batchSize = 50;
  let urls = {};

  for (let i = 0; i < vectorIds.length; i += batchSize) {
    const batch = vectorIds.slice(i, i + batchSize);
    const ids = batch.map((vec) => vec.id).join(",");

    try {
      const response = await fetchWithRetry(`https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=svg`, {
        headers: { "X-Figma-Token": FIGMA_API_KEY },
      });

      if (!response || !response.ok) {
        console.error(`❌ Ошибка при получении SVG (партия ${i / batchSize + 1}):`, response && response.statusText);
        continue;
      }

      const data = await response.json();
      Object.assign(urls, data.images);
    } catch (err) {
      console.error(`❌ Сетевая ошибка при получении SVG (партия ${i / batchSize + 1}):`, err.message || err);
    }
  }

  return urls;
}

async function downloadImage(name, url, folder) {
  try {
    const ext = folder === ICON_DIR ? ".svg" : ".png";
    const compact = compactImageName(name);
    const safeName = sanitizeFileName(compact);
    let filePath = path.join(folder, `${safeName}${ext}`);
    let counter = 0;
    const baseName = safeName.replace(/_\d+$/, "");
    const match = safeName.match(/_(\d+)$/);
    const originalIndex = match ? match[1] : "0";

    while (fs.existsSync(filePath)) {
      counter++;
      filePath = path.join(folder, `${baseName}_${originalIndex}_${counter}${ext}`);
    }

    const tmpPath = `${filePath}.tmp`;
    const response = await fetchWithRetry(url, { headers: { Connection: "close" } }, DEFAULT_RETRIES, DEFAULT_TIMEOUT);
    if (!response || !response.ok) {
      console.error(`Ошибка загрузки ${name}: ${response && response.status} ${response && response.statusText}`);
      return;
    }

    const hash = crypto.createHash("md5");
    const dest = fs.createWriteStream(tmpPath);

    await new Promise((resolve, reject) => {
      const body = response.body;
      if (!body) return reject(new Error("No response body"));

      body.on("data", (chunk) => {
        try {
          hash.update(chunk);
          dest.write(chunk);
        } catch (e) {
          reject(e);
        }
      });

      body.on("end", () => {
        dest.end();
      });

      body.on("error", (err) => {
        reject(err);
      });

      dest.on("finish", resolve);
      dest.on("error", reject);
    });

    const digest = hash.digest("hex");

    if (existingHashes.has(digest)) {
      console.log(`⚠️ Дубликат (по md5): ${name} (${ext}) — пропущено`);
      try {
        fs.unlinkSync(tmpPath);
      } catch (e) {}
      return;
    }

    existingHashes.add(digest);
    fs.renameSync(tmpPath, filePath);
    console.log(`✅ ${name} (${ext}) загружен → ${filePath}`);
  } catch (err) {
    console.error(`❌ Ошибка при скачивании ${name}:`, err && err.message ? err.message : err);
  }
}

async function filterAndDownload(images, folder, format = "png") {
  if (!images || images.length === 0) return;
  const urls = await fetchImageUrls(images, format);
  for (const img of images) {
    try {
      const imgUrl = urls[img.id];
      if (imgUrl) await downloadImage(img.name, imgUrl, folder);
      else console.warn(`🚨 Нет ссылки для ${img.name} (${img.id})`);
    } catch (err) {
      console.error("Ошибка при обработке изображения", img.name, err.message || err);
    }
  }
}

async function downloadSvgIcons(vectors) {
  console.log("🔍 Получение ссылок на SVG");
  const urls = await fetchSvgUrls(vectors);
  for (const vec of vectors) {
    try {
      const url = urls[vec.id];
      if (!url) {
        console.warn(`🚨 Нет ссылки для ${vec.name}`);
        continue;
      }
      await downloadImage(vec.name, url, ICON_DIR);
    } catch (err) {
      console.error("Ошибка при скачивании SVG", vec.name, err.message || err);
    }
  }
}

// determine ESM entry and CLI arg
const entryScript = process.argv[1] ? path.resolve(process.argv[1]) : null;
const isEntry = entryScript && path.resolve(__filename) === entryScript;
const cliArg = (process.argv[2] || "").toLowerCase();

// if invoked with a specific CLI flag, skip the full run
const SKIP_FULL_RUN = isEntry && ["--text", "--images", "--icons", "--svgs"].includes(cliArg);

async function extractAll() {
  try {
    console.log("📥 Получение данных Figma...");
    const figmaData = await fetchFigmaData();
    if (!figmaData) return console.error("Ошибка загрузки Figma API");

    let allSectionsText = {};
    let allImages = [];
    let allVectors = [];

    console.log("🔎 Обработка страниц...");
    let imageIndex = {};
    let vectorIndex = {};

    for (const pageName of PAGES) {
      console.log(`   Страница: ${pageName}`);
      const page = findPage(figmaData.document, pageName);
      if (!page) {
        console.warn(`   ⚠️ Страница "${pageName}" не найдена`);
        continue;
      }

      const frameNames = FRAMES_TO_EXTRACT[pageName] || [];
      console.log(
        `      Контейнеры для обработки: ${
          frameNames.length ? frameNames.join(", ") : "ни один (обрабатываются все топ-уровневые контейнеры)"
        }`
      );

      // Расширенный фильтр: FRAME, COMPONENT_SET, SECTION
      const containersToProcess = page.children.filter(
        (c) =>
          ["FRAME", "COMPONENT_SET", "SECTION"].includes(c.type) &&
          (frameNames.length === 0 || frameNames.includes(c.name)) // Точное совпадение имени
      );

      // Логирование всех топ-уровневых узлов для отладки
      console.log(
        `      Топ-уровневые узлы на странице: ${page.children
          .map((c) => `${c.type}: ${c.name}${c.type === "COMPONENT_SET" ? " (contains variants)" : ""}`)
          .join(", ")}`
      );

      // Логирование причин пропуска
      if (frameNames.length > 0) {
        const unmatched = frameNames.filter(
          (name) =>
            !page.children.some((c) => ["FRAME", "COMPONENT_SET", "SECTION"].includes(c.type) && c.name === name)
        );
        if (unmatched.length > 0) {
          console.warn(`      ⚠️ Не найдены контейнеры с именами: ${unmatched.join(", ")}`);
        }
      }

      if (containersToProcess.length === 0) {
        console.warn(`   ⚠️ Нет доступных контейнеров для извлечения на странице "${pageName}"`);
        continue;
      }

      const pageExclude = [...TOP_EXCLUDE, normalizeSectionKey(pageName)];
      const pageKey = normalizeSectionKey(pageName);
      allSectionsText[pageName] = allSectionsText[pageName] || {};
      imageIndex[pageName] = imageIndex[pageName] || {};
      vectorIndex[pageName] = vectorIndex[pageName] || {};

      for (const container of containersToProcess) {
        const containerName = container.name;
        console.log(`      Контейнер (${container.type}): ${containerName}`);
        if (container.type === "COMPONENT_SET" && container.children) {
          console.log(
            `         Variants в COMPONENT_SET: ${
              container.children.map((c) => `${c.type}: ${c.name}`).join(", ") || "нет"
            }`
          );
        }

        const excludeNames = [...pageExclude, normalizeSectionKey(containerName)];
        const section = findSectionNameFromPath([containerName], excludeNames) || "generic";
        imageIndex[pageName][section] = (imageIndex[pageName][section] || 0) + 1;
        vectorIndex[pageName][section] = (vectorIndex[pageName][section] || 0) + 1;

        const { sectionsText, images, vectors } = extractData(
          container,
          null,
          [],
          {},
          [],
          [],
          new Set(),
          new Set(),
          excludeNames,
          pageName,
          imageIndex[pageName][section],
          vectorIndex[pageName][section]
        );

        for (const [key, texts] of Object.entries(sectionsText)) {
          if (!allSectionsText[pageName][key]) allSectionsText[pageName][key] = [];
          allSectionsText[pageName][key].push(...texts);
        }

        allImages.push(...images);
        allVectors.push(...vectors);
      }
    }

    console.log("📄 Дедупликация данных...");
    for (const pageKey of Object.keys(allSectionsText)) {
      allSectionsText[pageKey] = dedupeSectionsText(allSectionsText[pageKey]);
    }

    const beforeImgs = allImages.length;
    allImages = dedupeById(allImages);
    console.log(`🧹 Images: deduped ${beforeImgs - allImages.length} entries, remaining ${allImages.length}`);

    const beforeVec = allVectors.length;
    allVectors = dedupeById(allVectors);
    console.log(`🧹 Vectors: deduped ${beforeVec - allVectors.length} entries, remaining ${allVectors.length}`);

    console.log("💾 Сохранение текстов...");
    fs.mkdirSync("assets", { recursive: true });
    const transformed = transformSectionsToJS(allSectionsText);
    const jsContent = `export default ${JSON.stringify(transformed, null, 2)};\n`;
    fs.writeFileSync("assets/extractedText.js", jsContent, "utf8");

    const sectionKeys = {};
    for (const [pageKey, sections] of Object.entries(allSectionsText)) {
      sectionKeys[pageKey] = Object.keys(sections);
    }
    fs.writeFileSync("assets/sectionKeys.json", JSON.stringify(sectionKeys, null, 2), "utf8");
    console.log("extractedText.js сохранён (страницы):", Object.keys(transformed));
    console.log("sectionKeys.json сохранён (страницы с ключами):", sectionKeys);

    console.log("📸 Загрузка изображений...");
    await filterAndDownload(allImages, IMAGE_DIR, "png");

    console.log("🖼️ Загрузка векторных иконок...");
    await downloadSvgIcons(allVectors);

    console.log("✅ Готово!");
  } catch (err) {
    console.error("Fatal error:", err && err.message ? err.message : err);
    process.exit(1);
  }
}

if (!SKIP_FULL_RUN) {
  extractAll();
} else {
  // CLI mode
  (async () => {
    try {
      const arg = cliArg;
      console.log(`CLI mode: ${arg}`);
      const figmaData = await fetchFigmaData();
      if (!figmaData) return console.error("Ошибка загрузки Figma API");

      let allSectionsText = {};
      let allImages = [];
      let allVectors = [];

      for (const pageName of PAGES) {
        console.log(`   Страница: ${pageName}`);
        const page = findPage(figmaData.document, pageName);
        if (!page) {
          console.warn(`   ⚠️ Страница "${pageName}" не найдена`);
          continue;
        }

        const frameNames = FRAMES_TO_EXTRACT[pageName] || [];
        console.log(
          `      Контейнеры для обработки: ${
            frameNames.length ? frameNames.join(", ") : "ни один (обрабатываются все топ-уровневые контейнеры)"
          }`
        );

        // Расширенный фильтр: FRAME, COMPONENT_SET, SECTION
        const containersToProcess = page.children.filter(
          (c) =>
            ["FRAME", "COMPONENT_SET", "SECTION"].includes(c.type) &&
            (frameNames.length === 0 || frameNames.includes(c.name)) // Точное совпадение имени
        );

        // Логирование всех топ-уровневых узлов для отладки
        console.log(
          `      Топ-уровневые узлы на странице: ${page.children
            .map((c) => `${c.type}: ${c.name}${c.type === "COMPONENT_SET" ? " (contains variants)" : ""}`)
            .join(", ")}`
        );

        // Логирование причин пропуска
        if (frameNames.length > 0) {
          const unmatched = frameNames.filter(
            (name) =>
              !page.children.some((c) => ["FRAME", "COMPONENT_SET", "SECTION"].includes(c.type) && c.name === name)
          );
          if (unmatched.length > 0) {
            console.warn(`      ⚠️ Не найдены контейнеры с именами: ${unmatched.join(", ")}`);
          }
        }

        if (containersToProcess.length === 0) {
          console.warn(`   ⚠️ Нет доступных контейнеров для извлечения на странице "${pageName}"`);
          continue;
        }

        const pageExclude = [...TOP_EXCLUDE, normalizeSectionKey(pageName)];
        allSectionsText[pageName] = allSectionsText[pageName] || {};

        for (const container of containersToProcess) {
          const containerName = container.name;
          console.log(`      Контейнер (${container.type}): ${containerName}`);
          if (container.type === "COMPONENT_SET" && container.children) {
            console.log(
              `         Variants в COMPONENT_SET: ${
                container.children.map((c) => `${c.type}: ${c.name}`).join(", ") || "нет"
              }`
            );
          }

          const excludeNames = [...pageExclude, normalizeSectionKey(containerName)];
          if (arg === "--text" || arg === "--texts") {
            const sections = extractTextFromPage(container, excludeNames);
            for (const [key, texts] of Object.entries(sections)) {
              if (!allSectionsText[pageName][key]) allSectionsText[pageName][key] = [];
              allSectionsText[pageName][key].push(...texts);
            }
          } else if (arg === "--images") {
            const images = extractImagesFromPage(container, excludeNames);
            allImages.push(...images);
          } else if (arg === "--icons" || arg === "--svgs") {
            const icons = extractIconsFromPage(container, excludeNames);
            allVectors.push(...icons);
          }
        }
      }

      if (arg === "--text" || arg === "--texts") {
        for (const pageKey of Object.keys(allSectionsText)) {
          allSectionsText[pageKey] = dedupeSectionsText(allSectionsText[pageKey]);
        }
        fs.mkdirSync("assets", { recursive: true });
        const transformed = transformSectionsToJS(allSectionsText);
        const jsContent = `export default ${JSON.stringify(transformed, null, 2)};\n`;
        fs.writeFileSync("assets/extractedText.js", jsContent, "utf8");
        const sectionKeys = {};
        for (const [pageKey, sections] of Object.entries(allSectionsText)) {
          sectionKeys[pageKey] = Object.keys(sections);
        }
        fs.writeFileSync("assets/sectionKeys.json", JSON.stringify(sectionKeys, null, 2), "utf8");
        console.log("Текст извлечён (страницы):", Object.keys(transformed));
        console.log("sectionKeys.json сохранён (страницы с ключами):", sectionKeys);
      } else if (arg === "--images") {
        const beforeImgs = allImages.length;
        allImages = dedupeById(allImages);
        console.log(`Images: deduped ${beforeImgs - allImages.length} entries, remaining ${allImages.length}`);
        await filterAndDownload(allImages, IMAGE_DIR, "png");
      } else if (arg === "--icons" || arg === "--svgs") {
        const beforeVec = allVectors.length;
        allVectors = dedupeById(allVectors);
        console.log(`Icons: deduped ${beforeVec - allVectors.length} entries, remaining ${allVectors.length}`);
        await downloadSvgIcons(allVectors);
      } else {
        console.log("Unknown CLI argument:", arg);
      }
    } catch (err) {
      console.error("Ошибка (CLI):", err && err.message ? err.message : err);
      process.exit(1);
    }
  })();
}
