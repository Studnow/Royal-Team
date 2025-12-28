import {
  fetchWithRetry,
  buildImageName,
  dedupeById,
  dedupeByNameKey,
  downloadImage,
  DEFAULT_RETRIES,
  DEFAULT_TIMEOUT,
} from "./utils.js";
import { FIGMA_API_KEY, FILE_KEY, ICON_DIR } from "./config.js";

export async function fetchSvgUrls(vectorIds) {
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

export async function downloadSvgIcons(vectors, existingHashes) {
  console.log("🔍 Получение ссылок на SVG");

  // Дедупликация иконок
  const beforeVec = vectors.length;
  vectors = dedupeById(vectors);
  vectors = dedupeByNameKey(vectors);
  console.log(`🧹 Vectors: deduped ${beforeVec - vectors.length} entries, remaining ${vectors.length}`);

  const urls = await fetchSvgUrls(vectors);
  for (const vec of vectors) {
    try {
      const url = urls[vec.id];
      if (!url) {
        console.warn(`🚨 Нет ссылки для ${vec.name}`);
        continue;
      }
      await downloadImage(vec.name, url, ICON_DIR, existingHashes);
    } catch (err) {
      console.error("Ошибка при скачивании SVG", vec.name, err.message || err);
    }
  }
}

export function extractIconsFromPage(page, excludeNames = []) {
  function extractIcons(node, parent = null, parentPath = [], vectors = [], seenVectorIds = new Set()) {
    if (!node) return vectors;

    if (node.type === "FRAME" || node.type === "GROUP") {
      const hasVector =
        node.children && node.children.some((child) => child.type === "VECTOR" || child.type === "GROUP");
      if (
        hasVector &&
        node.absoluteBoundingBox &&
        node.absoluteBoundingBox.width <= 300 &&
        node.absoluteBoundingBox.height <= 300 &&
        !seenVectorIds.has(node.id)
      ) {
        const iconName = buildImageName(node.name || "", parentPath, 3, excludeNames);
        vectors.push({ id: node.id, name: iconName, nodeName: node.name || "", parentPath });
        seenVectorIds.add(node.id);
      }
    }

    if (node.children) {
      const nextPath = parentPath.concat(node.name || "");
      for (const child of node.children) {
        extractIcons(child, node, nextPath, vectors, seenVectorIds);
      }
    }
    return vectors;
  }

  return extractIcons(page, null, [], [], new Set());
}
