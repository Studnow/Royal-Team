// scripts/figma.js
// Скрипт для извлечения текста, изображений и иконок из локального JSON-файла Figma
// Запуск:
//   node figma.js                → всё сразу (текст + картинки + иконки)
//   node figma.js --text         → только текст
//   node figma.js --images       → только картинки
//   node figma.js --icons        → только иконки/SVG

import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

import keys from "./cfg/keys.js";

const PAGES = keys.PAGES;
const FRAMES_TO_EXTRACT = keys.FRAMES_TO_EXTRACT;

const IMAGE_DIR = "assets/generated/images/";
const ICON_DIR = "assets/generated/icons/";

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

clearDirectory(IMAGE_DIR);
clearDirectory(ICON_DIR);

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_RETRIES = 4;

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function fetchWithRetry(url, options = {}, retries = DEFAULT_RETRIES, timeout = DEFAULT_TIMEOUT) {
  let attempt = 0;
  const backoffBase = 500;

  while (attempt <= retries) {
    attempt++;
    try {
      const fetchPromise = fetch(url, options);
      const timeoutPromise = new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout ${timeout}ms`)), timeout));
      const res = await Promise.race([fetchPromise, timeoutPromise]);

      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

      return res;
    } catch (err) {
      console.warn(`⚠️ Fetch failed (attempt ${attempt}) ${url} — ${err.message}`);
      if (attempt > retries) throw err;
      const wait = backoffBase * attempt;
      console.warn(`   retrying in ${wait}ms...`);
      await sleep(wait);
    }
  }
}

function loadFigmaData() {
  const INPUT_FILE = path.resolve(__dirname, "../cache/figma-latest.json");
  try {
    console.log("📂 Чтение локального файла:", INPUT_FILE);
    const content = fs.readFileSync(INPUT_FILE, "utf8");
    const data = JSON.parse(content);

    // Восстанавливаем parent (если ещё не сделали)
    function restoreParents(node, parent = null) {
      if (!node) return;
      node.parent = parent;
      if (node.children?.length) {
        node.children.forEach((child) => restoreParents(child, node));
      }
    }
    restoreParents(data.document);

    console.log("✓ Файл загружен");
    return data;
  } catch (err) {
    console.error("✗ Ошибка чтения файла:", err.message);
    process.exit(1);
  }
}

// ... (оставляем все ваши вспомогательные функции: isTechnicalName, normalizeSectionKey, sanitizeFileName, getSectionFromAncestors и т.д.)

// Основная функция извлечения текста (из предыдущей версии — она уже работает хорошо)
function extractTextFromPage(container, excludeNames = []) {
  const sections = {};

  function traverse(node) {
    if (["FRAME", "SECTION", "COMPONENT_SET"].includes(node.type)) {
      const name = node.name?.trim();
      const key =
        name && !isTechnicalName(name) && !excludeNames.includes(normalizeSectionKey(name))
          ? normalizeSectionKey(name) || "unnamed"
          : null;

      if (key) {
        collectTextFromChildren(node, key);
        return; // не углубляемся дальше
      }
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  function collectTextFromChildren(node, sectionKey) {
    const stack = [node];
    while (stack.length) {
      const curr = stack.pop();
      if (curr.type === "TEXT" && curr.characters) {
        const text = curr.characters.trim();
        if (text.length > 1) {
          sections[sectionKey] ??= new Set();
          sections[sectionKey].add(text);
        }
      }
      if (curr.children) stack.push(...curr.children);
    }
  }

  traverse(container);

  const result = {};
  for (const [key, set] of Object.entries(sections)) {
    result[key] = [...set].sort((a, b) => a.localeCompare(b));
  }

  return result;
}

// Сбор всех изображений и иконок (с id узлов)
function collectAssets(container, excludeNames = []) {
  const images = [];
  const vectors = [];

  function traverse(node, currentSection = null) {
    let section = currentSection;

    if (["FRAME", "SECTION", "COMPONENT_SET"].includes(node.type)) {
      const name = node.name?.trim();
      if (name && !isTechnicalName(name) && !excludeNames.includes(normalizeSectionKey(name))) {
        section = normalizeSectionKey(name) || "unnamed";
      }
    }

    // Растровые изображения
    if (node.fills?.length) {
      node.fills.forEach((fill) => {
        if (fill.type === "IMAGE" && fill.imageHash) {
          images.push({
            id: node.id,
            hash: fill.imageHash,
            section: section || "misc",
            name: sanitizeFileName(`${section || "misc"}_${node.name || "unnamed"}`),
          });
        }
      });
    }

    // Векторы (иконки)
    if (node.type === "VECTOR") {
      vectors.push({
        id: node.id,
        section: section || "misc",
        name: sanitizeFileName(`${section || "misc"}_${node.name || "unnamed"}`),
      });
    }

    if (node.children) {
      node.children.forEach((child) => traverse(child, section));
    }
  }

  traverse(container);
  return { images: dedupeById(images), vectors: dedupeById(vectors) };
}

// Батчинг id для одного запроса
function chunkArray(array, size = 50) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function downloadBatchedImages(assets, dir, format = "png") {
  const batches = chunkArray(assets, 50);
  console.log(`Скачивание ${assets.length} изображений (${batches.length} батчей по ${format})`);

  for (const batch of batches) {
    const ids = batch.map((a) => a.id).join(",");
    const url = `https://api.figma.com/v1/images/${keys.FILE}?ids=${ids}&format=${format}`;

    try {
      const res = await fetchWithRetry(url, {
        headers: { "X-Figma-Token": keys.API },
      });
      const data = await res.json();

      for (const item of batch) {
        const imgUrl = data.images?.[item.id];
        if (imgUrl) {
          await downloadFile(imgUrl, path.join(dir, `${item.name}.${format}`));
        } else {
          console.warn(`Не найдено изображение для id ${item.id}`);
        }
      }
    } catch (err) {
      console.error(`Ошибка батча: ${err.message}`);
    }
  }
}

async function downloadFile(url, filepath) {
  const res = await fetchWithRetry(url);
  const buffer = await res.buffer();
  const hash = crypto.createHash("md5").update(buffer).digest("hex");

  if (existingHashes.has(hash)) {
    console.log(`Дубликат пропущен: ${filepath}`);
    return;
  }

  existingHashes.add(hash);
  fs.writeFileSync(filepath, buffer);
  console.log(`Сохранено: ${filepath}`);
}

const existingHashes = new Set();

// ──────────────────────────────────────────────────────────────
// Главная логика
// ──────────────────────────────────────────────────────────────

(async () => {
  const figmaData = loadFigmaData();
  const arg = process.argv[2];

  let doText = true;
  let doImages = true;
  let doIcons = true;

  if (arg) {
    doText = arg === "--text" || arg === "--texts";
    doImages = arg === "--images";
    doIcons = arg === "--icons" || arg === "--svgs";
  }

  let allSectionsText = {};
  let allImages = [];
  let allVectors = [];

  console.log(`Обработка страниц: ${PAGES.join(", ")}`);

  for (const pageName of PAGES) {
    console.log(`\nСтраница: ${pageName}`);
    const page = findPage(figmaData.document, pageName);
    if (!page) {
      console.warn(`Страница "${pageName}" не найдена`);
      continue;
    }

    const frameNames = FRAMES_TO_EXTRACT[pageName] || [];
    const containers = page.children.filter(
      (c) =>
        ["FRAME", "SECTION", "COMPONENT_SET"].includes(c.type) &&
        (frameNames.length === 0 || frameNames.includes(c.name)),
    );

    if (!containers.length) {
      console.warn(`Нет контейнеров для обработки на странице "${pageName}"`);
      continue;
    }

    const pageExclude = [...TOP_EXCLUDE, normalizeSectionKey(pageName)];

    for (const container of containers) {
      const excludeNames = [...pageExclude, normalizeSectionKey(container.name)];

      if (doText) {
        const sections = extractTextFromPage(container, excludeNames);
        Object.assign(allSectionsText, sections); // можно улучшить, если нужны уникальные по страницам
      }

      if (doImages || doIcons) {
        const { images, vectors } = collectAssets(container, excludeNames);
        allImages.push(...images);
        allVectors.push(...vectors);
      }
    }
  }

  if (doText) {
    const transformed = { text: allSectionsText };
    fs.writeFileSync("assets/extractedText.js", `export default ${JSON.stringify(transformed, null, 2)};`, "utf8");
    console.log("Текст сохранён → assets/extractedText.js");
  }

  if (doImages) {
    allImages = dedupeById(allImages);
    console.log(`Изображения: ${allImages.length} уникальных`);
    await downloadBatchedImages(allImages, IMAGE_DIR, "png");
  }

  if (doIcons) {
    allVectors = dedupeById(allVectors);
    console.log(`Иконки/SVG: ${allVectors.length} уникальных`);
    await downloadBatchedImages(allVectors, ICON_DIR, "svg");
  }

  console.log("\nГотово!");
})();
