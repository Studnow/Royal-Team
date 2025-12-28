import keys from "./keys.js";

export const FIGMA_API_KEY = keys.API;
export const FILE_KEY = keys.FILE;
export const PAGE = keys.PAGE;
export const FRAMES_TO_EXTRACT = keys.FRAMES_TO_EXTRACT || {}; 
export const EXCLUDE_FRAMES = keys.EXCLUDE_FRAMES || {};
export const TARGET_PAGE = PAGE;
export const IMAGE_DIR = "assets/images/raw";
export const ICON_DIR = "assets/icons/raw";
export const TOP_EXCLUDE = [
  TARGET_PAGE ? String(TARGET_PAGE).toLowerCase() : "",
  "tablet",
  "mobile",
  "phone",
  "desktop",
  "главная_страница",
  "home",
  "page",
];