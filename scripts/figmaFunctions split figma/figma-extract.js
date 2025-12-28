import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { clearDirectory, fetchWithRetry } from "./utils.js";
import {
  FIGMA_API_KEY,
  FILE_KEY,
  IMAGE_DIR,
  ICON_DIR,
  TOP_EXCLUDE,
  FRAMES_TO_EXTRACT,
  EXCLUDE_FRAMES,
} from "./config.js";
import { extractTextFromPage, transformSectionsToJS, dedupeSectionsText } from "./text.js";
import { extractImagesFromPage, filterAndDownload } from "./images.js";
import { extractIconsFromPage, downloadSvgIcons } from "./icons.js";

const __filename = fileURLToPath(import.meta.url);
const existingHashes = new Set();

// Clear directories before extraction
clearDirectory(IMAGE_DIR);
clearDirectory(ICON_DIR);

// Determine ESM entry and CLI arg
const entryScript = process.argv[1] ? path.resolve(process.argv[1]) : null;
const isEntry = entryScript && path.resolve(__filename) === entryScript;
const cliArg = (process.argv[2] || "").toLowerCase();
const SKIP_FULL_RUN = isEntry && ["--text", "--images", "--icons", "--svgs"].includes(cliArg);

async function fetchFigmaData() {
  const response = await fetchWithRetry(`https://api.figma.com/v1/files/${FILE_KEY}`, {
    headers: { "X-Figma-Token": FIGMA_API_KEY },
  });
  if (!response || !response.ok) {
    console.error(`Ошибка API Figma: ${response ? response.statusText : "Нет ответа"}`);
    return null;
  }
  return response.json();
}

function findPage(document, pageName) {
  if (!document || !Array.isArray(document.children)) return null;
  return document.children.find((page) => String(page.name).toLowerCase() === String(pageName).toLowerCase());
}

function filterFrames(page, frameNames) {
  if (!page || !Array.isArray(page.children)) return [];
  const excludeFrames = Array.isArray(EXCLUDE_FRAMES) ? EXCLUDE_FRAMES : [];
  return page.children.filter(
    (child) =>
      child.type === "FRAME" &&
      (frameNames.length === 0 || frameNames.includes(child.name)) &&
      !excludeFrames.includes(child.name)
  );
}

if (!SKIP_FULL_RUN) {
  (async function extractAll() {
    try {
      console.log("📥 Получение данных Figma...");
      const figmaData = await fetchFigmaData();
      if (!figmaData) return console.error("Ошибка загрузки Figma API");

      console.log("🔎 Поиск страниц и фреймов");
      if (!figmaData.document || !Array.isArray(figmaData.document.children)) {
        console.error("Структура Figma недоступна или пуста");
        return;
      }
      console.log(`Доступные страницы: ${figmaData.document.children.map((p) => p.name).join(", ")}`);

      let sectionsText = {};
      let images = [];
      let vectors = [];

      for (const [pageName, frameNames] of Object.entries(FRAMES_TO_EXTRACT)) {
        const page = findPage(figmaData.document, pageName);
        if (!page) {
          console.warn(`⚠️ Страница "${pageName}" не найдена`);
          continue;
        }

        const frames = filterFrames(page, frameNames);
        if (frames.length === 0) {
          console.warn(`⚠️ Подходящие фреймы на странице "${pageName}" не найдены`);
          continue;
        }
        console.log(`Найдено фреймов на странице "${pageName}": ${frames.map((f) => f.name).join(", ")}`);

        for (const frame of frames) {
          console.log(`Обработка фрейма: ${frame.name} (страница: ${pageName})`);
          const frameText = extractTextFromPage(frame, TOP_EXCLUDE);
          Object.assign(sectionsText, frameText);
          images = images.concat(extractImagesFromPage(frame, TOP_EXCLUDE));
          vectors = vectors.concat(extractIconsFromPage(frame, TOP_EXCLUDE));
        }
      }

      if (Object.keys(sectionsText).length === 0 && images.length === 0 && vectors.length === 0) {
        console.error("Данные не извлечены. Проверьте FRAMES_TO_EXTRACT и EXCLUDE_FRAMES в keys.js");
        return;
      }

      console.log("📄 Извлечение текстов");
      sectionsText = dedupeSectionsText(sectionsText);
      fs.mkdirSync("assets", { recursive: true });
      const transformed = transformSectionsToJS(sectionsText);
      const jsContent = `export default ${JSON.stringify(transformed, null, 2)};\n`;
      fs.writeFileSync("assets/extractedText.js", jsContent, "utf8");
      fs.writeFileSync("assets/sectionKeys.json", JSON.stringify(Object.keys(transformed), null, 2), "utf8");
      console.log("extractedText.js сохранён (ключи секций):", Object.keys(transformed));
      console.log("sectionKeys.json сохранён (количество ключей):", Object.keys(transformed).length);

      console.log("📸 Извлечение и загрузка изображений");
      console.log(`Извлечено изображений: ${images.length}`);
      await filterAndDownload(images, IMAGE_DIR, "png", existingHashes);

      console.log("🖼️ Извлечение и загрузка иконок");
      console.log(`Извлечено иконок: ${vectors.length}`);
      await downloadSvgIcons(vectors, existingHashes);

      console.log("✅ Готово!");
    } catch (err) {
      console.error("Fatal error:", err && err.message ? err.message : err);
      process.exit(1);
    }
  })();
} else {
  // CLI mode
  (async () => {
    try {
      const arg = cliArg;
      console.log(`CLI mode: ${arg}`);
      const figmaData = await fetchFigmaData();
      if (!figmaData) return console.error("Ошибка загрузки Figma API");

      console.log(`Доступные страницы: ${figmaData.document.children.map((p) => p.name).join(", ")}`);

      let sections = {};
      let imgs = [];
      let icons = [];

      for (const [pageName, frameNames] of Object.entries(FRAMES_TO_EXTRACT)) {
        const page = findPage(figmaData.document, pageName);
        if (!page) {
          console.warn(`⚠️ Страница "${pageName}" не найдена`);
          continue;
        }

        const frames = filterFrames(page, frameNames);
        if (frames.length === 0) {
          console.warn(`⚠️ Подходящие фреймы на странице "${pageName}" не найдены`);
          continue;
        }
        console.log(`Найдено фреймов на странице "${pageName}": ${frames.map((f) => f.name).join(", ")}`);

        for (const frame of frames) {
          console.log(`Обработка фрейма: ${frame.name} (страница: ${pageName})`);
          if (arg === "--text" || arg === "--texts") {
            const frameText = extractTextFromPage(frame, TOP_EXCLUDE);
            Object.assign(sections, frameText);
          } else if (arg === "--images") {
            imgs = imgs.concat(extractImagesFromPage(frame, TOP_EXCLUDE));
          } else if (arg === "--icons" || arg === "--svgs") {
            icons = icons.concat(extractIconsFromPage(frame, TOP_EXCLUDE));
          }
        }
      }

      if (arg === "--text" || arg === "--texts") {
        if (Object.keys(sections).length === 0) {
          console.error("Тексты не извлечены. Проверьте FRAMES_TO_EXTRACT и EXCLUDE_FRAMES в keys.js");
          return;
        }
        sections = dedupeSectionsText(sections);
        fs.mkdirSync("assets", { recursive: true });
        const transformed = transformSectionsToJS(sections);
        const jsContent = `export default ${JSON.stringify(transformed, null, 2)};\n`;
        fs.writeFileSync("assets/extractedText.js", jsContent, "utf8");
        fs.writeFileSync("assets/sectionKeys.json", JSON.stringify(Object.keys(transformed), null, 2), "utf8");
        console.log("Текст извлечён (секций):", Object.keys(transformed).length);
        console.log("sectionKeys.json сохранён (количество ключей):", Object.keys(transformed).length);
        return;
      }

      if (arg === "--images") {
        if (imgs.length === 0) {
          console.error("Изображения не извлечены. Проверьте FRAMES_TO_EXTRACT и EXCLUDE_FRAMES в keys.js");
          return;
        }
        console.log(`Извлечено изображений: ${imgs.length}`);
        await filterAndDownload(imgs, IMAGE_DIR, "png", existingHashes);
        return;
      }

      if (arg === "--icons" || arg === "--svgs") {
        if (icons.length === 0) {
          console.error("Иконки не извлечены. Проверьте FRAMES_TO_EXTRACT и EXCLUDE_FRAMES в keys.js");
          return;
        }
        console.log(`Извлечено иконок: ${icons.length}`);
        await downloadSvgIcons(icons, existingHashes);
        return;
      }

      console.log("Unknown CLI argument:", arg);
    } catch (err) {
      console.error("Ошибка (CLI):", err && err.message ? err.message : err);
      process.exit(1);
    }
  })();
}
