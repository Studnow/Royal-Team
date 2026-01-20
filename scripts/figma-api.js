import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import keys from "./cfg/keys.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CACHE_DIR = path.resolve(__dirname, "../cache/g-msk");
const FILE_KEY = keys.FILE;
const FIGMA_TOKEN = keys.API;

const CACHE_FILE = path.join(CACHE_DIR, `figma-${FILE_KEY}-latest.json`);

async function downloadFullFile() {
  console.log("📥 Скачивание полного файла Figma...");

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
      headers: { "X-Figma-Token": FIGMA_TOKEN },
    });
    if (response.status === 429) {
      // console.log(`429 заголовки ответа:`);
      // for (const [key, value] of response.headers.entries()) {
      //   console.log(`  ${key}: ${value}`);
      // }
      const retryAfterSec = parseInt(response.headers.get("Retry-After") || "60", 10);
      const now = new Date();
      const resetTime = new Date(now.getTime() + retryAfterSec * 1000);
      console.warn(
        `[${now.toLocaleString()}] 429. Сброс через ${retryAfterSec} сек (${Math.round(retryAfterSec / 60)} мин), примерно в ${resetTime.toLocaleString()}`,
      );
      // await sleep(retryAfterSec * 1000);
      return;
    }
    if (!response.ok) {
      throw new Error(`Figma API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), "utf8");

    console.log("✓ Полный файл сохранён:");
    console.log("  →", CACHE_FILE);
    console.log(`  Размер: ${data.document?.children?.length || 0} страниц`);
    console.log(`  Дата: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error("Ошибка при скачивании:", err.message);
    process.exit(1);
  }
}

downloadFullFile();
