// genPageTemplates.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { splitTemplateData } from "./splitTemplate.js";
import { sectionsMap } from "../src/data/dataConfig/sections.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pageName = "homePage"; // поменяй по необходимости
const outDir = path.join(__dirname, "../src/data/sections/cfg/test/");
const dataPath = path.join(outDir, `${pageName}Data.js`);
const stylesPath = path.join(outDir, `${pageName}Styles.js`);

const contentOutput = {};
const stylesOutput = {};

for (const [key, section] of Object.entries(sectionsMap)) {
  const { content, styles } = splitTemplateData(section);
  contentOutput[key] = content;
  stylesOutput[key] = styles;
}

const jsExport = (name, obj) => `export default ${JSON.stringify(obj, null, 2)};\n`;

fs.writeFileSync(dataPath, jsExport("pageData", contentOutput), "utf-8");
fs.writeFileSync(stylesPath, jsExport("pageStyles", stylesOutput), "utf-8");

console.log("✅ Шаблоны контента и стилей сгенерированы:", pageName);