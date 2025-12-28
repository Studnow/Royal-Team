import { readdirSync } from "fs";
import { resolve } from "path";

import {ComponentsMap} from "../data/components/index";

// icon preview for sorting on starting project
const iconDir = resolve(__dirname, "../../assets/generated/icons"); // Путь к SVG
const icons = readdirSync(iconDir)
  .filter((file) => file.endsWith(".svg"))
  .map((file) => ({
    src: `/assets/generated/icons/`,
    name: file.replace(/\.svg$/, ""), // Удаляем .svg из имени,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Генерируем массив компонентов card для каждой иконки
const iconsPreview = icons.map((iconRaw) => ({
  ...ComponentsMap["card"],
  cardClass: "w-60 h-auto",
  cardActions: false,
  heading: {
    description: iconRaw.name,
  },
  picture: { ...ComponentsMap["picture"], src:{path: `${iconRaw.src}`, item: {name: `${iconRaw.name}`, ext: "svg"}}, w: "48", h: "60" },
}));

export default iconsPreview;
