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

const IMAGE_DIR = "assets/generated/g-msk/images/";
const ICON_DIR = "assets/generated/g-msk/icons/";

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

// недостающие функции

function findPage(document, pageName) {
  if (!document?.children || !Array.isArray(document.children)) {
    console.warn("Документ не содержит страниц");
    return null;
  }

  if (!pageName) {
    return document.children[0] || null; // первая страница по умолчанию
  }

  // Ищем точное совпадение имени (с учётом эмодзи и регистра)
  return document.children.find((page) => String(page.name).trim() === String(pageName).trim()) || null;
}

// Вспомогательная: нормализация имени секции в slug (lowercase, без спецсимволов)
function normalizeSectionKey(raw) {
  if (!raw) return null;
  return String(raw)
    .trim()
    .replace(/[^A-Za-z0-9\u0400-\u04FF_]+/g, "") // оставляем буквы, цифры, кириллицу, _
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase();
}

// Вспомогательная: проверка, является ли имя техническим/ненужным
function isTechnicalName(name) {
  if (!name) return true;
  const trimmed = String(name).trim();
  if (trimmed.length === 0 || trimmed.length <= 2) return true;

  const techPatterns = [
    /^(rect|rectangle|frame|group|instance|component|vector|slice|boolean|line|oval|button|image|layer|tile|grid|path|shape|variant|property)\b/i,
    /^(layer|image|rectangle|rect|oval|group|frame)\s*\d+$/i,
    /^\d+$/,
  ];

  return techPatterns.some((pattern) => pattern.test(trimmed));
}

function sanitizeFileName(name) {
  if (!name) return "unnamed";

  return String(name)
    .trim()
    .replace(/[\/\\?%*:|"<> ]+/g, "_") // запрещённые символы и пробелы → _
    .replace(/_+/g, "_") // несколько _ подряд → один _
    .replace(/^_|_$/g, "") // убираем _ в начале и конце
    .replace(/[^\x00-\x7F]+/g, "_"); // не-ASCII (эмодзи, кириллица и т.д.) → _
}
// Дедупликация по id
function dedupeById(arr) {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}
// конец недостающих функций
// old
// async function fetchWithRetry(
//   url,
//   options = {},
//   retries = DEFAULT_RETRIES,
//   timeout = DEFAULT_TIMEOUT,
// ) {
//   let attempt = 0;
//   const backoffBase = 500;

//   while (attempt <= retries) {
//     attempt++;
//     try {
//       const fetchPromise = fetch(url, options);
//       const timeoutPromise = new Promise((_, rej) =>
//         setTimeout(() => rej(new Error(`timeout ${timeout}ms`)), timeout),
//       );
//       const res = await Promise.race([fetchPromise, timeoutPromise]);

//       if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

//       return res;
//     } catch (err) {
//       console.warn(
//         `⚠️ Fetch failed (attempt ${attempt}) ${url} — ${err.message}`,
//       );
//       if (attempt > retries) throw err;
//       const wait = backoffBase * attempt;
//       console.warn(`   retrying in ${wait}ms...`);
//       await sleep(wait);
//     }
//   }
// }

async function fetchWithRetry(url, options = {}, retries = DEFAULT_RETRIES, timeout = DEFAULT_TIMEOUT) {
  let attempt = 0;
  const backoffBase = 500;

  while (attempt <= retries) {
    attempt++;
    try {
      const fetchPromise = fetch(url, options);
      const timeoutPromise = new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout ${timeout}ms`)), timeout));
      const res = await Promise.race([fetchPromise, timeoutPromise]);

      if (res.status === 429) {
        // ← Блок для отладки, показывает заголовки ответа API
        // console.log(`429 Too Many Requests — заголовки ответа:`);
        // for (const [key, value] of res.headers.entries()) {
        //   console.log(`  ${key}: ${value}`);
        // }

        let retryAfterSec = parseInt(res.headers.get("Retry-After") || "300", 10);
        const now = new Date();
        const resetTime = new Date(now.getTime() + retryAfterSec * 1000);

        console.warn(
          `[${now.toLocaleString()}] 429 Rate limit. ` +
            `Сброс через ${retryAfterSec} сек ≈ ${Math.round(retryAfterSec / 60)} мин ` +
            `(примерно в ${resetTime.toLocaleString()})`,
        );

        await sleep(retryAfterSec * 1000);
        continue; // повторяем запрос после ожидания
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

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
  const INPUT_FILE = path.resolve(__dirname, "../cache/g-msk/figma-latest.json");
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

//old

// function collectAssets(container, excludeNames = []) {
//   const images = [];
//   const vectors = [];

//   function traverse(node, currentSection = null) {
//     let section = currentSection;

//     if (["FRAME", "SECTION", "COMPONENT_SET"].includes(node.type)) {
//       const name = node.name?.trim();
//       if (
//         name &&
//         !isTechnicalName(name) &&
//         !excludeNames.includes(normalizeSectionKey(name))
//       ) {
//         section = normalizeSectionKey(name) || "unnamed";
//       }
//     }

//     // Растровые изображения
//     if (node.fills?.length) {
//       node.fills.forEach((fill) => {
//         if (fill.type === "IMAGE" && fill.imageHash) {
//           images.push({
//             id: node.id,
//             hash: fill.imageHash,
//             section: section || "misc",
//             name: sanitizeFileName(
//               `${section || "misc"}_${node.name || "unnamed"}`,
//             ),
//           });
//         }
//       });
//     }

//     // Векторы (иконки)
//     if (node.type === "VECTOR") {
//       vectors.push({
//         id: node.id,
//         section: section || "misc",
//         name: sanitizeFileName(
//           `${section || "misc"}_${node.name || "unnamed"}`,
//         ),
//       });
//     }

//     if (node.children) {
//       node.children.forEach((child) => traverse(child, section));
//     }
//   }

//   traverse(container);
//   console.log(`Найдено IMAGE-fills: ${images.length}`);
//   console.log(`Найдено VECTOR-узлов: ${vectors.length}`);
//   return { images: dedupeById(images), vectors: dedupeById(vectors) };
// }

// new

function collectAssets(container, excludeNames = []) {
  const images = [];
  const vectors = [];
  const seenImageHashes = new Set();
  const seenVectorIds = new Set();

  function traverse(node, currentSection = null) {
    let section = currentSection;

    if (["FRAME", "SECTION", "COMPONENT_SET"].includes(node.type)) {
      const name = node.name?.trim();
      if (name && !isTechnicalName(name) && !excludeNames.includes(normalizeSectionKey(name))) {
        section = normalizeSectionKey(name) || "unnamed";
      }
    }

    // Растровые: IMAGE fill или RECTANGLE/ELLIPSE/INSTANCE
    if (node.fills?.some((f) => f.type === "IMAGE" && f.imageHash)) {
      node.fills.forEach((fill) => {
        if (fill.type === "IMAGE" && fill.imageHash && !seenImageHashes.has(fill.imageHash)) {
          seenImageHashes.add(fill.imageHash);
          images.push({
            id: node.id,
            hash: fill.imageHash,
            section: section || "misc",
            name: sanitizeFileName(`${section || "misc"}_${node.name || "image"}`),
          });
        }
      });
    } else if (
      ["RECTANGLE", "ELLIPSE", "INSTANCE"].includes(node.type) &&
      !isTechnicalName(node.name) &&
      !seenImageHashes.has(node.id)
    ) {
      seenImageHashes.add(node.id);
      images.push({
        id: node.id,
        hash: node.id,
        section: section || "misc",
        name: sanitizeFileName(`${section || "misc"}_${node.name || "rect"}`),
      });
    }

    // Векторы: VECTOR
    if (node.type === "VECTOR" && !isTechnicalName(node.name) && !seenVectorIds.has(node.id)) {
      seenVectorIds.add(node.id);
      vectors.push({
        id: node.id,
        section: section || "misc",
        name: sanitizeFileName(`${section || "misc"}_${node.name || "icon"}`),
      });
    }

    if (node.children) {
      node.children.forEach((child) => traverse(child, section));
    }
  }

  traverse(container);

  console.log(`Найдено изображений после фильтра: ${images.length}`);
  console.log(`Найдено векторов после фильтра: ${vectors.length}`);

  return { images, vectors };
}

function chunkArray(array, size = 5) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
// old
// async function downloadBatchedImages(assets, dir, format = "png") {
//   const batches = chunkArray(assets, 50);
//   console.log(
//     `Скачивание ${assets.length} изображений (${batches.length} батчей по ${format})`,
//   );

//   for (const batch of batches) {
//     const ids = batch.map((a) => a.id).join(",");
//     const url = `https://api.figma.com/v1/images/${keys.FILE}?ids=${ids}&format=${format}`;

//     try {
//       const res = await fetchWithRetry(url, {
//         headers: { "X-Figma-Token": keys.API },
//       });
//       const data = await res.json();

//       for (const item of batch) {
//         const imgUrl = data.images?.[item.id];
//         if (imgUrl) {
//           await downloadFile(imgUrl, path.join(dir, `${item.name}.${format}`));
//         } else {
//           console.log(`Батч ids: ${batch.map((a) => a.id).join(", ")}`);
//           console.log(
//             `Получено от Figma: ${Object.keys(data.images || {}).length} URL`,
//           );
//           console.warn(`Пропущен узел ${item.id} — Figma не вернул URL`);
//         }
//       }
//     } catch (err) {
//       console.error(`Ошибка батча: ${err.message}`);
//     }
//   }
// }

async function downloadBatchedImages(assets, dir, format = "png") {
  const CACHE_FILE = path.resolve(__dirname, "../cache/downloaded-assets.json");
  console.log("Кеш скачанных файлов: " + (fs.existsSync(CACHE_FILE) ? "найден" : "не найден, начнём с нуля"));
  let downloadedCache = {};
  if (fs.existsSync(CACHE_FILE)) {
    downloadedCache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  }
  const downloadedIds = new Set(downloadedCache[format] || []);
  const toDownload = assets.filter((a) => !downloadedIds.has(a.id));
  if (!toDownload.length) return console.log(`Все ${format} уже скачаны`);
  const batches = chunkArray(toDownload, 5);
  // if (!assets.length) return;

  // const batches = chunkArray(assets, 5); // уменьшил до 20 для безопасности
  console.log(`Скачивание ${assets.length} изображений (${batches.length} батчей по ${format})`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const ids = batch.map((a) => a.id).join(",");
    const url = `https://api.figma.com/v1/images/${keys.FILE}?ids=${ids}&format=${format}`;

    let data;
    let retryCount = 0;

    while (!data && retryCount < 5) {
      retryCount++;
      try {
        const res = await fetchWithRetry(url, {
          headers: { "X-Figma-Token": keys.API },
        });

        if (res.status === 429) {
          console.log(`429 заголовки ответа:`);
          for (const [key, value] of res.headers.entries()) {
            console.log(`  ${key}: ${value}`);
          }
          const retryAfterSec = parseInt(res.headers.get("Retry-After") || "60", 10);
          const now = new Date();
          const resetTime = new Date(now.getTime() + retryAfterSec * 1000);
          console.warn(
            `[${now.toLocaleString()}] 429 (батч ${i + 1}). Сброс через ${retryAfterSec} сек (${Math.round(retryAfterSec / 60)} мин), примерно в ${resetTime.toLocaleString()}`,
          );
          await sleep(retryAfterSec * 1000);
          continue;
        }

        data = await res.json();
        console.log(
          `[${new Date().toLocaleString()}] Батч ${i + 1}/${batches.length}: ${Object.keys(data.images || {}).length} URL`,
        );
      } catch (err) {
        console.error(`[${new Date().toLocaleString()}] Ошибка батча ${i + 1} (попытка ${retryCount}): ${err.message}`);
        await sleep(60000);
      }
    }

    if (data) {
      for (const item of batch) {
        const imgUrl = data.images?.[item.id];
        if (imgUrl) {
          const res = await fetchWithRetry(imgUrl);
          const arrayBuffer = await res.arrayBuffer(); // убрал buffer(), чтобы избежать deprecation
          const buffer = Buffer.from(arrayBuffer);
          const hash = crypto.createHash("md5").update(buffer).digest("hex");

          if (existingHashes.has(hash)) {
            console.log(`Дубликат: ${item.name}.${format}`);
            continue;
          }

          existingHashes.add(hash);
          fs.writeFileSync(path.join(dir, `${item.name}.${format}`), buffer);
          console.log(`Сохранено: ${item.name}.${format}`);

          // cache
          downloadedCache[format] ??= [];
          downloadedCache[format].push(item.id);
          fs.writeFileSync(CACHE_FILE, JSON.stringify(downloadedCache, null, 2), "utf8");
          // console.log(`Добавлен в кеш: ${item.id} (${format})`); // опционально
        } else {
          console.warn(`Пропущен ${item.id} — нет URL`);
        }
      }
    } else {
      console.error(`Батч ${i + 1} пропущен после 5 попыток`);
    }

    if (i < batches.length - 1) {
      console.log(`[${new Date().toLocaleString()}] Пауза 30 сек...`);
      await sleep(30000);
    }
  }
}

async function downloadFile(url, filepath) {
  const res = await fetchWithRetry(url);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
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
