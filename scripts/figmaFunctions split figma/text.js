import { findSectionNameFromPath, isPageOrDeviceName, isTechnicalName, normalizeSectionKey } from "./utils.js";

export function dedupeSectionsText(sectionsText) {
  const out = {};
  for (const [key, arr] of Object.entries(sectionsText || {})) {
    const seen = new Set();
    const list = [];
    for (const s of arr || []) {
      if (seen.has(s)) continue;
      seen.add(s);
      list.push(s);
    }
    out[key] = list;
  }
  return out;
}

export function transformSectionsToJS(sectionsText) {
  const out = {};
  for (const [key, arr] of Object.entries(sectionsText || {})) {
    out[key] = {
      text: Array.isArray(arr) ? arr : [],
      components: {},
    };
  }
  return out;
}

export function extractTextFromPage(page, excludeNames = []) {
  function extractText(node, parent = null, parentPath = [], sectionsText = {}) {
    if (!node) return sectionsText;

    if (node.type === "TEXT" && node.characters) {
      let cleanedText = node.characters.replace(/\s+/g, " ").trim();
      if (cleanedText.length >= 3) {
        let section = findSectionNameFromPath(parentPath);
        if (!section) {
          if (parent && parent.name && !isPageOrDeviceName(parent.name) && !isTechnicalName(parent.name)) {
            section = normalizeSectionKey(parent.name);
          }
        }
        if (!section) section = "no-section";

        if (!sectionsText[section]) sectionsText[section] = [];
        sectionsText[section].push(cleanedText);
      }
    }

    if (node.children) {
      const nextPath = parentPath.concat(node.name || "");
      for (const child of node.children) {
        extractText(child, node, nextPath, sectionsText);
      }
    }
    return sectionsText;
  }

  return extractText(page, null, [], {});
}