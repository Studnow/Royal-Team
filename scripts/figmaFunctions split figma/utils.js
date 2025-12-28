import fs from "fs";
import path from "path";
import crypto from "crypto";
import fetch from "node-fetch";
import { ICON_DIR, TOP_EXCLUDE } from "./config.js";

export function fetchWithRetry(url, options = {}, retries = 3, timeout = 10000) {
  return new Promise(async (resolve, reject) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return resolve(response);
      } catch (err) {
        if (attempt === retries) return reject(err);
        console.warn(`Попытка ${attempt} не удалась для ${url}: ${err.message}. Повтор...`);
        await new Promise((res) => setTimeout(res, 1000 * attempt));
      }
    }
  });
}

export function clearDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        clearDirectory(curPath);
        fs.rmdirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
  fs.mkdirSync(dir, { recursive: true });
}

export function dedupeById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function dedupeByNameKey(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

export function findSiblingText(node, parent) {
  if (!parent || !parent.children) return "";
  const siblings = parent.children.filter((child) => child !== node && child.characters);
  return siblings.length > 0 ? siblings[0].characters : "";
}

export function buildImageName(nodeName, parentPath = [], maxDepth = 3, excludeNames = []) {
  const cleanNodeName = String(nodeName || "")
    .replace(/[^a-zA-Z0-9\s_-]/g, "")
    .trim();
  if (!cleanNodeName || excludeNames.includes(cleanNodeName.toLowerCase())) return "";
  const pathParts = parentPath
    .map((part) =>
      String(part || "")
        .replace(/[^a-zA-Z0-9\s_-]/g, "")
        .trim()
    )
    .filter((part) => part && !excludeNames.includes(part.toLowerCase()))
    .slice(-maxDepth);
  return [...pathParts, cleanNodeName].filter(Boolean).join("_").replace(/\s+/g, "_");
}

export function sanitizeFileName(name) {
  return name
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function compactImageName(name) {
  return name
    .replace(/(_|^)(desktop|mobile|tablet|phone|home|page|главная_страница|main|screen|ui|kit|layout|_)+/gi, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export const DEFAULT_RETRIES = 3;
export const DEFAULT_TIMEOUT = 10000;

export async function downloadImage(name, url, folder, existingHashes) {
  try {
    const ext = folder === ICON_DIR ? ".svg" : ".png";
    const compact = compactImageName(name);
    const safeName = sanitizeFileName(compact);
    let filePath = path.join(folder, `${safeName}${ext}`);
    let counter = 1;
    while (fs.existsSync(filePath)) {
      filePath = path.join(folder, `${safeName}_${counter}${ext}`);
      counter++;
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

/* ---------- выбор секции по parentPath/sibling ---------- */

// Ищем секцию в parentPath; возвращаем normalized key или null
export function findSectionNameFromPath(parentPath = []) {
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

// определяем, является ли имя page/device/frame, которые нужно пропускать при выборе секции
export function isPageOrDeviceName(name) {
  if (!name) return true;
  const s = String(name).trim().toLowerCase();
  if (!s) return true;
  if (TOP_EXCLUDE.includes(s)) return true;
  if (/страниц|страница/.test(s)) return true;
  if (/\b(page|home|landing)\b/.test(s)) return true;
  return false;
}

// helper: считают, является ли имя техническим/дефолтным
export function isTechnicalName(name) {
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

// нормализуем ключ секции в slug-like (lowercase, underscores)
export function normalizeSectionKey(raw) {
  if (!raw) return null;
  return String(raw)
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w\u0400-\u04FF_]+/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase();
}
