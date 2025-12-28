import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import crypto from "crypto";

import keys from "../keys.js";

const FIGMA_API_KEY = keys.API;
const FILE_KEY = keys.FILE;
const PAGE = keys.PAGE;

const TARGET_PAGE = PAGE;
const IMAGE_DIR = "assets/images/raw";
const ICON_DIR = "assets/icons/raw";
const existingHashes = new Set();

function clearDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
  fs.mkdirSync(directory, { recursive: true });
}

// Очистка папок перед загрузкой
clearDirectory(IMAGE_DIR);
clearDirectory(ICON_DIR);

const DEFAULT_TIMEOUT = 30000; // ms (увеличен)
const DEFAULT_RETRIES = 4;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function fetchWithRetry(url, options = {}, retries = DEFAULT_RETRIES, timeout = DEFAULT_TIMEOUT) {
  let attempt = 0;
  let backoff = 500;
  while (attempt <= retries) {
    attempt++;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (err) {
      clearTimeout(timer);
      const msg = err && err.message ? err.message : String(err);
      console.warn(`⚠️ Fetch failed (attempt ${attempt}) ${url} — ${msg}`);
      if (attempt > retries) {
        console.error(`❌ All retries failed for ${url}`);
        throw err;
      }
      const wait = backoff * attempt;
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
  return document.children.find((page) => page.name.toLowerCase() === pageName.toLowerCase());
}

// Patch name building

// ...existing code...
// helper: считают, является ли имя техническим/дефолтным
function isTechnicalName(name) {
  if (!name) return true;
  const trimmed = String(name).trim();
  if (trimmed.length === 0) return true;
  if (trimmed.length <= 2) return true; // слишком короткое
  const techRe =
    /^(rect|rectangle|frame|group|instance|component|vector|slice|boolean|line|oval|button|image|layer|tile|grid)\b/i;
  if (techRe.test(trimmed)) return true;
  // имена вида "123", "Layer 1", "Variant 2", "Rectangle 1171"
  if (/^(layer|variant|property|shape)\b/i.test(trimmed)) return false; // иногда смысловые
  if (/^[\w\s]*\d+$/.test(trimmed)) {
    // если перед цифрой — техническое, но попробуем не отвергать полностью:
    return /^((rect|rectangle|frame|group|instance|unnamed)\b)/i.test(trimmed);
  }
  return false;
}

// patch sibling text

// поиск ближайшего текстового соседа внутри родителя (по индексу, ищем наружу)
function findSiblingText(node, parent) {
  if (!parent || !parent.children || !Array.isArray(parent.children)) return null;
  const children = parent.children;
  const idx = children.findIndex((c) => c.id === node.id);
  if (idx === -1) return null;

  // search outward: left/right, increasing distance
  for (let dist = 1; dist < children.length; dist++) {
    const left = idx - dist;
    const right = idx + dist;
    const candLeft = left >= 0 ? children[left] : null;
    const candRight = right < children.length ? children[right] : null;

    for (const cand of [candLeft, candRight]) {
      if (!cand) continue;
      if (cand.type === "TEXT" && cand.characters) {
        const txt = cand.characters.replace(/\s+/g, " ").trim();
        if (txt.length >= 3 && !/^\d+$/.test(txt)) return txt;
      }
      // иногда heading — FRAME с текстом внутри
      if ((cand.type === "FRAME" || cand.type === "GROUP") && cand.children) {
        const textChild = cand.children.find(
          (ch) => ch.type === "TEXT" && ch.characters && ch.characters.trim().length >= 3
        );
        if (textChild) return textChild.characters.replace(/\s+/g, " ").trim();
      }
    }
  }
  return null;
}

// end patch sibling text

// Формирует имя файла из пути родителей и имени узла.
// Берёт до 3 значимых сегментов снизу вверх + собственное имя, если оно не техническое.
function buildImageName(nodeName, parentPath = [], maxParts = 3, excludeNames = []) {
  const pathParts = parentPath
    .map((p) => (p ? String(p).trim() : ""))
    .filter(Boolean)
    .filter((p) => !excludeNames.includes(String(p).toLowerCase()));
  const meaningful = [];
  // обход снизу вверх (ближайший родитель важнее)
  for (let i = pathParts.length - 1; i >= 0 && meaningful.length < maxParts; i--) {
    const part = pathParts[i];
    if (!isTechnicalName(part)) meaningful.unshift(part);
  }

  const nodeIsTech = isTechnicalName(nodeName);
  let baseParts = meaningful.slice();
  if (!nodeIsTech && nodeName && nodeName.trim()) {
    // если имя узла осмысленное, добавляем его в конец
    baseParts.push(nodeName.trim());
  } else if (baseParts.length === 0) {
    // ничего осмысленного — используем nodeName (даже если техническое) чтобы не потерять уникальность
    baseParts.push(nodeName ? nodeName.trim() : "image");
  }
  // normalize and join with double underscore as separator between levels
  return baseParts.map((p) => p.replace(/\s+/g, "_")).join("__");
}

function extractData(
  node,
  parent = null,
  parentPath = [],
  textSet = new Set(),
  images = [],
  vectors = [],
  seenImageIds = new Set(),
  seenVectorIds = new Set(),
  excludeNames = []
) {
  if (node.type === "TEXT" && node.characters) {
    let cleanedText = node.characters.replace(/\s+/g, " ").trim();
    if (cleanedText.length >= 10) textSet.add(cleanedText);
  }

  if (node.fills) {
    for (const fill of node.fills) {
      if (fill.type === "IMAGE" && fill.imageRef && !seenImageIds.has(node.id)) {
        // попробуем найти соседний текст (заголовок/секцию)
        const siblingText = findSiblingText(node, parent);
        const pathWithSibling = siblingText ? parentPath.concat(siblingText) : parentPath;
        const imageName = buildImageName(node.name || "", pathWithSibling, 3, excludeNames);
        images.push({ id: node.id, name: imageName });
        seenImageIds.add(node.id);
      }
    }
  }

  if (node.type === "FRAME" || node.type === "GROUP") {
    const hasVector = node.children && node.children.some((child) => child.type === "VECTOR" || child.type === "GROUP");
    if (
      hasVector &&
      node.absoluteBoundingBox &&
      node.absoluteBoundingBox.width <= 300 &&
      node.absoluteBoundingBox.height <= 300 &&
      !seenVectorIds.has(node.id)
    ) {
      const iconName = buildImageName(node.name || "", parentPath, 3, excludeNames);
      vectors.push({ id: node.id, name: iconName });
      seenVectorIds.add(node.id);
    }
  }

  if (node.children) {
    const nextPath = parentPath.concat(node.name || "");
    for (const child of node.children)
      extractData(child, node, nextPath, textSet, images, vectors, seenImageIds, seenVectorIds, excludeNames);
  }
  return { textSet, images, vectors };
}

// end patch normalize name 2

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

function sanitizeFileName(name) {
  return name
    .replace(/[\/\\?%*:|"<>]/g, "_")
    .replace(/\s*\/\s*/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .trim();
}

// patch normalize names

// compact name builder: produces device_section-component_size (all lowercase)
function compactImageName(raw) {
  if (!raw) return "image";
  const s = String(raw).replace(/__+/g, "_").replace(/[=,]+/g, "_");
  const tokens = s
    .split(/[^A-Za-z0-9\u0400-\u04FF]+/)
    .filter(Boolean)
    .map((t) => t.toLowerCase());

  const devices = ["mobile", "phone", "tablet", "desktop"];
  const sizes = ["big", "small", "smal", "large"];
  const sections = ["catalog", "portfolio", "product", "product_card", "components", "ui", "ui_kit"];

  const tech = new Set([
    "components",
    "component",
    "ui",
    "kit",
    "property",
    "property1",
    "property_1",
    "layer",
    "layer1",
    "card",
  ]);

  // pull out device, size, section (first occurrence)
  const take = (arr, setLike) => {
    for (let i = 0; i < arr.length; i++) {
      if (setLike.includes(arr[i])) return arr.splice(i, 1)[0];
    }
    return null;
  };

  const device = take(tokens, devices);
  const size = take(tokens, sizes);
  const section = take(tokens, sections);

  // remaining tokens cleaned from technical words and single-digit indexes
  const componentTokens = tokens.filter((t) => {
    if (tech.has(t)) return false;
    if (/^\d+$/.test(t)) return false;
    // drop generic "catalog/portfolio/product" if duplicates left
    if (sections.includes(t)) return false;
    return true;
  });

  // build component name
  const component = componentTokens.join("_") || null;

  // if section missing but last token looks like a section, try to recover
  const finalSection =
    section ||
    (component && ["catalog", "portfolio", "product"].find((s) => component.includes(s))
      ? component.match(/(catalog|portfolio|product)/)[0]
      : null);

  // build name: device + "_" + section + "-" + component + ("_" + size)
  const parts = [];
  if (device) parts.push(device);
  if (finalSection) parts.push(finalSection);
  let middle = parts.join("_");
  let name;
  if (component && finalSection && component.includes(finalSection)) {
    // avoid duplicate: if component contains section, just use component
    name = component;
  } else if (middle) {
    name = component ? `${middle}-${component}` : middle;
  } else {
    name = component || raw.replace(/\s+/g, "_");
  }
  if (size) name = `${name}_${size}`;
  // normalize multiple underscores/hyphens
  return name.replace(/_+/g, "_").replace(/-+/g, "-").replace(/^_|_$/g, "");
}

// end patch normalize names

async function downloadImage(name, url, folder) {
  // загружаем потоково, считаем md5 на лету, пишем во временный файл, затем проверяем дубликат и переименовываем
  try {
    const ext = folder === ICON_DIR ? ".svg" : ".png";
    // compact + sanitize name for better sorting
    const compact = compactImageName(name);
    const safeName = sanitizeFileName(compact);
    let filePath = path.join(folder, `${safeName}${ext}`);
    let counter = 1;
    while (fs.existsSync(filePath)) {
      filePath = path.join(folder, `${safeName}_${counter}${ext}`);
      counter++;
    }

    const tmpPath = `${filePath}.tmp`;

    // Добавляем заголовок Connection: close чтобы избежать проблем с keep-alive
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
      console.log(`⚠️ Дубликат: ${name} (${ext}) — пропущено`);
      try {
        fs.unlinkSync(tmpPath);
      } catch (e) {}
      return;
    }

    existingHashes.add(digest);

    // переименовываем tmp -> финальный файл
    fs.renameSync(tmpPath, filePath);
    console.log(`✅ ${name} (${ext}) загружен → ${filePath}`);
  } catch (err) {
    console.error(`❌ Ошибка при скачивании ${name}:`, err && err.message ? err.message : err);
    // не пробрасываем — продолжаем обработку других файлов
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

(async function extractAll() {
  console.log("📥 Получение данных Figma...");
  const figmaData = await fetchFigmaData();
  if (!figmaData) return console.error("Ошибка загрузки Figma API");

  console.log("🔎 Поиск страницы");
  const page = findPage(figmaData.document, TARGET_PAGE);
  if (!page) return console.error("Страница не найдена");

  console.log("📄 Извлечение данных");
  const { textSet, images, vectors } = extractData(page, null, [], new Set(), [], [], new Set(), new Set(), [
    TARGET_PAGE.toLowerCase(),
  ]);

  fs.writeFileSync("extractedText.json", JSON.stringify([...textSet], null, 2));

  console.log("📸 Загрузка изображений");
  await filterAndDownload(images, IMAGE_DIR, "png");

  console.log("🖼️ Загрузка векторных иконок");
  await downloadSvgIcons(vectors);

  console.log("✅ Готово!");
})();
// ...existing code...
