import {
  fetchWithRetry,
  buildImageName,
  findSiblingText,
  dedupeById,
  dedupeByNameKey,
  downloadImage,
  DEFAULT_RETRIES,
  DEFAULT_TIMEOUT,
} from "./utils.js";
import { FIGMA_API_KEY, FILE_KEY, IMAGE_DIR } from "./config.js";

export async function fetchImageUrls(imageIds, format = "png") {
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

export async function filterAndDownload(images, folder, format = "png", existingHashes) {
  if (!images || images.length === 0) return;

  // Дедупликация изображений
  const beforeImgs = images.length;
  images = dedupeById(images);
  images = dedupeByNameKey(images);
  console.log(`🧹 Images: deduped ${beforeImgs - images.length} entries, remaining ${images.length}`);

  const urls = await fetchImageUrls(images, format);
  for (const img of images) {
    try {
      const imgUrl = urls[img.id];
      if (imgUrl) await downloadImage(img.name, imgUrl, folder, existingHashes);
      else console.warn(`🚨 Нет ссылки для ${img.name} (${img.id})`);
    } catch (err) {
      console.error("Ошибка при обработке изображения", img.name, err.message || err);
    }
  }
}

export function extractImagesFromPage(page, excludeNames = []) {
  function extractImages(node, parent = null, parentPath = [], images = [], seenImageIds = new Set()) {
    if (!node) return images;

    if (node.fills) {
      for (const fill of node.fills) {
        if (fill && fill.type === "IMAGE" && fill.imageRef && !seenImageIds.has(node.id)) {
          const siblingText = findSiblingText(node, parent);
          const pathWithSibling = siblingText ? parentPath.concat(siblingText) : parentPath;
          const imageName = buildImageName(node.name || "", pathWithSibling, 3, excludeNames);
          images.push({ id: node.id, name: imageName, nodeName: node.name || "", parentPath: pathWithSibling });
          seenImageIds.add(node.id);
        }
      }
    }

    if (node.children) {
      const nextPath = parentPath.concat(node.name || "");
      for (const child of node.children) {
        extractImages(child, node, nextPath, images, seenImageIds);
      }
    }
    return images;
  }

  return extractImages(page, null, [], [], new Set());
}
