// scripts/figma.js
// Скрипт для извлечения текста, изображений и иконок из локального JSON-файла Figma (без обращения к API)
// Запуск: node scripts/figma.js --texts | --images | --icons

import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

import keys from "./cfg/keys.js";

const PAGES = keys.PAGES;
const FRAMES_TO_EXTRACT = keys.FRAMES_TO_EXTRACT;

console.log("Фреймы", FRAMES_TO_EXTRACT);

const IMAGE_DIR = "assets/generated/images/";
const ICON_DIR = "assets/generated/icons/";
const existingHashes = new Set();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function loadFigmaData() {
  const INPUT_FILE = path.resolve(__dirname, "../cache/figma-latest.json"); // Путь к локальному файлу (можно настроить)

  try {
    console.log("📂 Чтение локального файла Figma:", INPUT_FILE);
    const content = fs.readFileSync(INPUT_FILE, "utf8");
    const data = JSON.parse(content);
    console.log("✓ Файл успешно загружен");
    return data;
  } catch (err) {
    console.error("✗ Не удалось прочитать файл:", err.message);
    console.error("  Убедитесь, что файл существует и является валидным JSON");
    console.error("  Путь:", INPUT_FILE);
    process.exit(1);
  }
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
    .replace(/[\/\\?%*:|"<> ]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .replace(/[^\x00-\x7F]+/g, "_");
}

// helper: get first non-technical ancestor name for section key
function getSectionFromAncestors(node, excludeNames = []) {
  let current = node.parent;
  while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
    const name = current.name?.trim();
    if (
      name &&
      !isTechnicalName(name) &&
      !isPageOrDeviceName(name) &&
      !excludeNames.includes(normalizeSectionKey(name))
    ) {
      return normalizeSectionKey(name);
    }
    current = current.parent;
  }
  return null;
}

// extract text from a single node
function extractTextFromNode(node, excludeNames = []) {
  const texts = [];
  if (node.type === "TEXT" && node.characters) {
    const text = node.characters.trim();
    if (text && text.length > 1) {
      // skip very short
      const section = getSectionFromAncestors(node, excludeNames) || "misc";
      texts.push({ section, text });
    }
  }
  return texts;
}

// extract image fills from a node (for raster images)
function extractImageFromNode(node, excludeNames = []) {
  const images = [];
  if (node.fills && Array.isArray(node.fills)) {
    for (const fill of node.fills) {
      if (fill.type === "IMAGE" && fill.imageHash) {
        const section = getSectionFromAncestors(node, excludeNames) || "misc";
        const name = node.name?.trim() || "unnamed";
        images.push({
          id: node.id,
          hash: fill.imageHash,
          name: sanitizeFileName(`${section}_${name}`),
          section,
        });
      }
    }
  }
  return images;
}

// extract vectors/icons (assuming VECTOR nodes are icons)
function extractIconFromNode(node, excludeNames = []) {
  const icons = [];
  if (node.type === "VECTOR") {
    const section = getSectionFromAncestors(node, excludeNames) || "misc";
    const name = node.name?.trim() || "unnamed";
    icons.push({
      id: node.id,
      name: sanitizeFileName(`${section}_${name}`),
      section,
    });
  }
  return icons;
}

// recursive extract for text
function extractTextFromPage(node, excludeNames = []) {
  let sections = {};
  const stack = [node];

  while (stack.length > 0) {
    const current = stack.pop();
    const texts = extractTextFromNode(current, excludeNames);
    for (const { section, text } of texts) {
      if (!sections[section]) sections[section] = [];
      sections[section].push(text);
    }

    if (current.children) {
      for (const child of current.children) {
        stack.push(child);
      }
    }
  }

  return sections;
}

// recursive extract for images
function extractImagesFromPage(node, excludeNames = []) {
  let images = [];
  const stack = [node];

  while (stack.length > 0) {
    const current = stack.pop();
    images.push(...extractImageFromNode(current, excludeNames));

    if (current.children) {
      for (const child of current.children) {
        stack.push(child);
      }
    }
  }

  return images;
}

// recursive extract for icons/vectors
function extractIconsFromPage(node, excludeNames = []) {
  let icons = [];
  const stack = [node];

  while (stack.length > 0) {
    const current = stack.pop();
    icons.push(...extractIconFromNode(current, excludeNames));

    if (current.children) {
      for (const child of current.children) {
        stack.push(child);
      }
    }
  }

  return icons;
}

// dedupe text sections
function dedupeSectionsText(sections) {
  for (const key of Object.keys(sections)) {
    sections[key] = [...new Set(sections[key])].sort();
  }
  return sections;
}

// dedupe by id/hash
function dedupeById(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.id || item.hash;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// transform text sections to JS structure
function transformSectionsToJS(sections) {
  const transformed = {};
  for (const [section, texts] of Object.entries(sections)) {
    transformed[section] = {
      text: texts,
      images: [], // placeholder
    };
  }
  return transformed;
}

// download raster images
async function filterAndDownload(images, dir, ext = "png") {
  for (const img of images) {
    const url = `https://api.figma.com/v1/images/${keys.FILE}?ids=${img.id}&format=${ext}`;
    try {
      const res = await fetchWithRetry(url, {
        headers: { "X-Figma-Token": keys.API },
      });
      const data = await res.json();
      const imgUrl = data.images[img.id];
      if (imgUrl) {
        await downloadImage(imgUrl, `${dir}${img.name}.${ext}`);
      }
    } catch (err) {
      console.warn(`Skip image ${img.id}: ${err.message}`);
    }
  }
}

// download single image
async function downloadImage(url, filePath) {
  const res = await fetchWithRetry(url);
  const buffer = await res.buffer();
  const hash = crypto.createHash("md5").update(buffer).digest("hex");
  if (existingHashes.has(hash)) {
    console.log(`Duplicate image skipped: ${filePath}`);
    return;
  }
  existingHashes.add(hash);
  fs.writeFileSync(filePath, buffer);
  console.log(`Downloaded: ${filePath}`);
}

// download SVG icons
async function downloadSvgIcons(icons) {
  for (const icon of icons) {
    const url = `https://api.figma.com/v1/images/${keys.FILE}?ids=${icon.id}&format=svg`;
    try {
      const res = await fetchWithRetry(url, {
        headers: { "X-Figma-Token": keys.API },
      });
      const data = await res.json();
      const svgUrl = data.images[icon.id];
      if (svgUrl) {
        await downloadSvg(svgUrl, `${ICON_DIR}${icon.name}.svg`);
      }
    } catch (err) {
      console.warn(`Skip icon ${icon.id}: ${err.message}`);
    }
  }
}

// download single SVG
async function downloadSvg(url, filePath) {
  const res = await fetchWithRetry(url);
  const text = await res.text();
  const hash = crypto.createHash("md5").update(text).digest("hex");
  if (existingHashes.has(hash)) {
    console.log(`Duplicate SVG skipped: ${filePath}`);
    return;
  }
  existingHashes.add(hash);
  fs.writeFileSync(filePath, text);
  console.log(`Downloaded SVG: ${filePath}`);
}

(async () => {
  try {
    const figmaData = await loadFigmaData();
    if (!figmaData) {
      console.error("No Figma data loaded");
      process.exit(1);
    }

    const arg = process.argv[2];
    if (!arg) {
      console.log("Usage: node figma.js --texts | --images | --icons");
      process.exit(0);
    }

    let allSectionsText = {};
    let allImages = [];
    let allVectors = [];

    console.log(`Processing pages: ${PAGES.join(", ")}`);

    for (const pageName of PAGES) {
      console.log(`   Page: ${pageName}`);
      const page = findPage(figmaData.document, pageName);
      if (!page) {
        console.warn(`   ⚠️ Page "${pageName}" not found`);
        continue;
      }

      const frameNames = FRAMES_TO_EXTRACT[pageName] || [];
      console.log(
        `      Контейнеры для обработки: ${
          frameNames.length ? frameNames.join(", ") : "ни один (обрабатываются все топ-уровневые контейнеры)"
        }`,
      );

      // Расширенный фильтр: FRAME, COMPONENT_SET, SECTION
      const containersToProcess = page.children.filter(
        (c) =>
          ["FRAME", "COMPONENT_SET", "SECTION"].includes(c.type) &&
          (frameNames.length === 0 || frameNames.includes(c.name)), // Точное совпадение имени
      );

      // Логирование всех топ-уровневых узлов для отладки
      console.log(
        `      Топ-уровневые узлы на странице: ${
          page.children
            .map((c) => `${c.type}: ${c.name}${c.type === "COMPONENT_SET" ? " (contains variants)" : ""}`)
            .join(", ") || "нет"
        }`,
      );

      // Логирование причин пропуска
      if (frameNames.length > 0) {
        const unmatched = frameNames.filter(
          (name) =>
            !page.children.some((c) => ["FRAME", "COMPONENT_SET", "SECTION"].includes(c.type) && c.name === name),
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
            }`,
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
