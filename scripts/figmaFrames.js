// scripts/frame-log.js
// Скрипт для компактного лога топ-уровневых фреймов, секций и наборов компонентов из нескольких страниц Figma
// Запуск: node scripts/frame-log.js

import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

// Коррекция пути для keys.js и __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import keys from "./cfg/keys.js"; // Относительный путь из scripts/

const FIGMA_API_KEY = keys.API;
const FILE_KEY = keys.FILE;
const TARGET_PAGES = Array.isArray(keys.PAGES) ? keys.PAGES : [keys.PAGES || ""];

// Конфиг для фильтрации
const CONFIG = {
  MAX_DEPTH: 1, // Только топ-уровневые узлы (глубина 1 для детей CANVAS)
  EXCLUDE_PATTERNS: [/^\d+$/, /^Frame \d+$/i, /^group/i, /^rectangle/i, /^artboard/i],
  OUTPUT_FILE: path.resolve(__dirname, "../assets/generated/figma-frames.auto.js"), // generated
};

// Проверка конфига
if (!FIGMA_API_KEY || !FILE_KEY) {
  console.error("❌ Ошибка: API или FILE_KEY отсутствуют в keys.js");
  process.exit(1);
}
if (!TARGET_PAGES.length) {
  console.error("❌ Ошибка: PAGES или PAGE не указаны в keys.js");
  process.exit(1);
}

// Рекурсивная функция для сбора FRAME, SECTION и COMPONENT_SET nodes
function collectNodes(node, depth = 0, pageName = "") {
  let nodes = [];
  let badNodes = [];
  let debugInfo = [];

  if (!node) return { nodes, badNodes, debugInfo };

  // Отладка только для страницы "⚙️ component"
  if (pageName.toLowerCase().includes("component")) {
    debugInfo.push(`[Depth ${depth}] Node: ${node.name || "unnamed"} (Type: ${node.type})`);
  }

  if (
    (node.type === "FRAME" || node.type === "SECTION" || node.type === "COMPONENT_SET") &&
    depth <= CONFIG.MAX_DEPTH
  ) {
    const nodeName = node.name || "unnamed";
    const isTechnical = CONFIG.EXCLUDE_PATTERNS.some((pattern) => {
      const matches = pattern.test(nodeName);
      if (matches && pageName.toLowerCase().includes("component")) {
        debugInfo.push(`[Depth ${depth}] Excluded: ${nodeName} (Type: ${node.type}) matches pattern ${pattern}`);
      }
      return matches;
    });

    if (!isTechnical) {
      nodes.push(nodeName);
      if (pageName.toLowerCase().includes("component")) {
        debugInfo.push(`[Depth ${depth}] Included: ${nodeName} (Type: ${node.type})`);
      }
    } else {
      badNodes.push(nodeName);
    }
  }

  // Обработка детей, если не превышена глубина
  if (node.children && depth < CONFIG.MAX_DEPTH) {
    for (const child of node.children) {
      const {
        nodes: childNodes,
        badNodes: childBadNodes,
        debugInfo: childDebugInfo,
      } = collectNodes(child, depth + 1, pageName);
      nodes = [...nodes, ...childNodes];
      badNodes = [...badNodes, ...childBadNodes];
      debugInfo = [...debugInfo, ...childDebugInfo];
    }
  }

  return { nodes, badNodes, debugInfo };
}

// Поиск страницы
function findPage(document, pageName) {
  if (!document || !Array.isArray(document.children)) {
    console.error("❌ Ошибка: Документ пустой или некорректный");
    return null;
  }
  if (!pageName) {
    console.log("ℹ️ PAGE не указана, берём первую страницу:", document.children[0]?.name || "не найдена");
    return document.children[0] || null;
  }
  const page = document.children.find((page) => String(page.name).toLowerCase() === String(pageName).toLowerCase());
  if (!page) {
    console.error(`❌ Ошибка: Страница "${pageName}" не найдена`);
  }
  return page;
}

// Основная функция
async function generateNodeLog() {
  try {
    console.log("📥 Загрузка данных Figma...");
    const response = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
      headers: { "X-Figma-Token": FIGMA_API_KEY },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const figmaData = await response.json();

    // Обработка всех указанных страниц
    const logData = {};
    let totalNodes = 0;
    let totalBadNodes = 0;

    for (const pageName of TARGET_PAGES) {
      console.log("🔎 Поиск страницы:", pageName || "первая страница");
      const page = findPage(figmaData.document, pageName);
      if (!page) {
        console.warn(`⚠️ Страница "${pageName}" не найдена, пропускаем`);
        logData[pageName || "default"] = {
          nodeKeys: [],
          toExtract: [], // Добавляем пустой toExtract
          bad_nodes: [],
          recommendations: `Страница "${pageName}" не найдена`,
        };
        continue;
      }

      console.log(`📄 Сбор узлов для страницы "${pageName}"`);
      const { nodes, badNodes, debugInfo } = collectNodes(page, 0, pageName);

      // Удаление дубликатов из nodeKeys
      const uniqueNodes = [...new Set(nodes)];

      // Вывод отладочной информации только для страницы "⚙️ component"
      // if (pageName.toLowerCase().includes("component")) {
      //   console.log(`\n=== Отладка для страницы "${pageName}" ===`);
      //   console.log(debugInfo.join("\n"));
      //   console.log(`=== Конец отладки ===\n`);
      // }

      logData[pageName || "default"] = {
        nodeKeys: uniqueNodes.sort((a, b) => a.localeCompare(b)),
        toExtract: [], // Добавляем пустой toExtract для каждой страницы
        bad_nodes: badNodes.sort((a, b) => a.localeCompare(b)),
        recommendations:
          "Добавьте имена из nodeKeys в toExtract в figmaFrames.json. Исключите ненужные узлы через EXCLUDE_NODES.",
      };

      totalNodes += uniqueNodes.length;
      totalBadNodes += badNodes.length;
    }

    // Сохранение файла
    const outputDir = path.dirname(CONFIG.OUTPUT_FILE);
    console.log(`📂 Папка для сохранения: ${outputDir}`);
    console.log(`📝 Файл будет сохранён: ${CONFIG.OUTPUT_FILE}`);

    try {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log("✅ Папка создана или уже существует:", outputDir);
      const jsModule =
        "// AUTO-GENERATED by scripts/figmaFrames.js — DO NOT EDIT\nexport default " +
        JSON.stringify(logData, null, 2) +
        ";\n";
      fs.writeFileSync(CONFIG.OUTPUT_FILE, jsModule, "utf8");
      console.log(`✅ Лог успешно сохранён в ${CONFIG.OUTPUT_FILE}`);
      console.log(`ℹ️ Найдено узлов: ${totalNodes}, технических/пустых: ${totalBadNodes} (см. bad_nodes)`);
    } catch (writeErr) {
      console.error(`❌ Ошибка при сохранении файла: ${writeErr.message}`);
      console.error("Проверьте права доступа к папке или корректность пути:", outputDir);
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Ошибка:", err.message || err);
    console.error("Проверьте FIGMA_API_KEY, FILE_KEY, PAGES в keys.js или доступность Figma API");
    process.exit(1);
  }
}

generateNodeLog();
