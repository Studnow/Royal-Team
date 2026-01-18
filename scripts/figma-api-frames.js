// scripts/figmaFrames.js
// Скрипт для компактного лога топ-уровневых фреймов, секций и наборов компонентов
// из локального JSON-файла Figma (без обращения к API)
// Запуск: node scripts/figmaFrames.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import keys from "./cfg/keys.js"; // Относительный путь из scripts/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────────────────────────────────────────────────────
// Конфигурация
// ──────────────────────────────────────────────────────────────

const CONFIG = {
  // Путь к сохранённому файлу (можно менять)
  INPUT_FILE: path.resolve(__dirname, "../cache/figma-latest.json"),

  // Максимальная глубина поиска (1 = только топ-уровневые дети canvas)
  MAX_DEPTH: 1,

  // Паттерны для исключения технических/временных фреймов
  EXCLUDE_PATTERNS: [/^\d+$/, /^Frame \d+$/i, /^group/i, /^rectangle/i, /^artboard/i, /^copy/i, /^backup/i],

  // Куда сохраняем результат
  OUTPUT_FILE: path.resolve(__dirname, "../assets/generated/file/figma-frames.auto.js"),
};

// Список страниц, которые нужно обработать (можно указать названия или оставить пустым → все страницы)
const TARGET_PAGES = keys.PAGES;
// const TARGET_PAGES [ // old or non keys 
  // "макет"
  // "Home",
  // "⚙️ components",
  // "📱 Mobile",
  // или оставьте пустым → обработаются все страницы
// ];

// ──────────────────────────────────────────────────────────────
// Вспомогательные функции
// ──────────────────────────────────────────────────────────────

function isTechnicalName(name) {
  return CONFIG.EXCLUDE_PATTERNS.some((pattern) => pattern.test(name));
}

function collectNodes(node, depth = 0, pageName = "", debug = false) {
  const result = {
    nodes: [],
    badNodes: [],
    debugInfo: [],
  };

  if (!node) return result;

  const nodeName = node.name?.trim() || "unnamed";

  if (debug) {
    result.debugInfo.push(`[Depth ${depth}] ${node.type.padEnd(12)} → ${nodeName}`);
  }

  // Собираем только нужные типы на нужной глубине
  if (
    (node.type === "FRAME" || node.type === "SECTION" || node.type === "COMPONENT_SET") &&
    depth <= CONFIG.MAX_DEPTH
  ) {
    if (!isTechnicalName(nodeName)) {
      result.nodes.push(nodeName);
      if (debug) result.debugInfo.push(`      → included`);
    } else {
      result.badNodes.push(nodeName);
      if (debug) result.debugInfo.push(`      → excluded (technical)`);
    }
  }

  // Рекурсия в детей (если не превышена глубина)
  if (node.children && depth < CONFIG.MAX_DEPTH) {
    for (const child of node.children) {
      const childResult = collectNodes(child, depth + 1, pageName, debug);
      result.nodes.push(...childResult.nodes);
      result.badNodes.push(...childResult.badNodes);
      result.debugInfo.push(...childResult.debugInfo);
    }
  }

  return result;
}

function findPage(document, targetName) {
  if (!document?.children) return null;

  if (!targetName) {
    // берём первую страницу
    return document.children[0] || null;
  }

  return (
    document.children.find((p) => p.name?.toLowerCase() === targetName.toLowerCase()) ||
    document.children.find((p) => p.name?.toLowerCase().includes(targetName.toLowerCase())) ||
    null
  );
}

// ──────────────────────────────────────────────────────────────
// Основная логика
// ──────────────────────────────────────────────────────────────

async function main() {
  console.log("┌──────────────────────────────────────────────┐");
  console.log("│         Figma Frames → Local JSON logger     │");
  console.log("└──────────────────────────────────────────────┘\n");

  // 1. Читаем файл
  let figmaData;
  try {
    console.log("→ Читаем файл:", CONFIG.INPUT_FILE);
    const content = fs.readFileSync(CONFIG.INPUT_FILE, "utf8");
    figmaData = JSON.parse(content);
    console.log("✓ Файл успешно загружен\n");
  } catch (err) {
    console.error("✗ Не удалось прочитать файл:", err.message);
    console.error("  Убедитесь, что файл существует и является валидным JSON");
    console.error("  Путь:", CONFIG.INPUT_FILE);
    process.exit(1);
  }

  const logData = {};
  let totalNodes = 0;
  let totalBad = 0;

  const pagesToProcess =
    TARGET_PAGES.length > 0 ? TARGET_PAGES : figmaData.document.children.map((p) => p.name || "unnamed");

  console.log(`Обрабатываем страниц: ${pagesToProcess.length}\n`);

  for (const pageName of pagesToProcess) {
    console.log(`📄 ${pageName}`);

    const page = findPage(figmaData.document, pageName);

    if (!page) {
      console.log("  ✗ Страница не найдена");
      logData[pageName] = {
        status: "not_found",
        nodeKeys: [],
        bad_nodes: [],
      };
      continue;
    }

    const debug = pageName.toLowerCase().includes("component") || pageName.toLowerCase().includes("компонент");

    const { nodes, badNodes, debugInfo } = collectNodes(page, 0, pageName, debug);

    const uniqueNodes = [...new Set(nodes)].sort((a, b) => a.localeCompare(b));

    logData[pageName] = {
      nodeKeys: uniqueNodes,
      toExtract: [],
      bad_nodes: [...new Set(badNodes)].sort((a, b) => a.localeCompare(b)),
      count: uniqueNodes.length,
      bad_count: badNodes.length,
      // toExtract: [] // для удобства — можно потом заполнять
    };

    totalNodes += uniqueNodes.length;
    totalBad += badNodes.length;

    if (debug && debugInfo.length > 0) {
      console.log("  (отладка включена)");
      // console.log(debugInfo.join("\n"));
    }

    console.log(`  найдено: ${uniqueNodes.length}  /  технических: ${badNodes.length}`);
  }

  console.log("\nИтого:");
  console.log(`  Всего полезных узлов: ${totalNodes}`);
  console.log(`  Всего технических:   ${totalBad}`);

  // Сохраняем результат
  const outputDir = path.dirname(CONFIG.OUTPUT_FILE);
  fs.mkdirSync(outputDir, { recursive: true });

  const jsContent = [
    "// AUTO-GENERATED — figmaFrames.js (local mode)",
    "// Дата генерации: " + new Date().toISOString(),
    "// Источник: " + path.basename(CONFIG.INPUT_FILE),
    "",
    "export default " + JSON.stringify(logData, null, 2) + ";",
    "",
  ].join("\n");

  fs.writeFileSync(CONFIG.OUTPUT_FILE, jsContent, "utf-8");

  console.log("\n✓ Результат сохранён в:");
  console.log("  " + CONFIG.OUTPUT_FILE);
  console.log("\nГотово! 🚀\n");
}

main().catch((err) => {
  console.error("Критическая ошибка:", err);
  process.exit(1);
});
