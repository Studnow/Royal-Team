import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// new paths (manual has priority)
const customPagesPath = path.resolve(__dirname, "../../assets/figma-frames.js");
const generatedPagesPath = path.resolve(__dirname, "../../assets/generated/figma-frames.auto.js");

// seed — если assets ещё не сгенерирован и нет ручного файла
const SEED_PAGES = ["Design"];

let pages = {};
try {
  let pagesSource = null;
  if (fs.existsSync(customPagesPath)) pagesSource = customPagesPath; // user edits have priority
  else if (fs.existsSync(generatedPagesPath)) pagesSource = generatedPagesPath; // falls back to generated

  if (pagesSource) {
    // import expects a file:// URL when given absolute path
    const mod = await import(pathToFileURL(pagesSource).href);
    pages = mod?.default || {};
    console.log(`keys: loaded pages from ${pagesSource} → ${Object.keys(pages).join(", ")}`);
  }
} catch (e) {
  console.warn("keys: failed to load pages module:", e && e.message ? e.message : e);
  // игнорируем — файл ещё не создан или импорт не прошёл
}

const PAGES = Object.keys(pages).length ? Object.keys(pages) : SEED_PAGES;
const FRAMES_TO_EXTRACT = Object.fromEntries(
  Object.entries(pages).map(([pageName, cfg]) => [pageName, Array.isArray(cfg?.toExtract) ? cfg.toExtract : []])
);

export default {
  API: process.env.FIGMA_API_KEY,
  FILE: process.env.FILE,
  PAGES,
  FRAMES_TO_EXTRACT,
};
