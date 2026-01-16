import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
// import viteImagemin from "@vheemstra/vite-plugin-imagemin";
// import imageminMozjpeg from "imagemin-mozjpeg";
// import imageminPngquant from "imagemin-pngquant";
// import imageminGifsicle from "imagemin-gifsicle";
// import imageminSvgo from "imagemin-svgo";
// import imageminWebp from "imagemin-webp";

import { contextData } from "./src/data/data";
import Helpers from "./scripts/Hbs-helpers";

import { createHtmlPlugin } from "vite-plugin-html";
import critical from "rollup-plugin-critical";

const isProduction = process.env.NODE_ENV === "production";
const isUI = false;

function handlebarsOverride(options) {
  const plugin = handlebars(options);
  // Currently handleHotUpdate skips further processing, which bypasses
  // postcss and in turn tailwind doesn't pick up file changes
  delete plugin.handleHotUpdate;
  return plugin;
}

const jsToBottomNoModule = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      html = html.replace(`type="module" crossorigin`, "");
      let scriptTag = html.match(/<script[^>]*>(.*?)<\/script[^>]*>/)[0];
      // console.log("\n SCRIPT TAG", scriptTag, "\n");
      html = html.replace(scriptTag, "");
      html = html.replace("<!-- # INSERT SCRIPT HERE -->", scriptTag);
      return html;
    },
  };
};

function generateJsonPlugin() {
  return {
    name: "generate-json",
    buildEnd() {
      const outputPath = path.resolve(__dirname, "assets/data/combinedData.json");
      const jsonData = JSON.stringify(contextData, null, 2);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, jsonData, "utf-8");
      // console.log(`JSON data written to ${outputPath}`);
    },
  };
}

export default defineConfig({
  base: isProduction ? "./" : "/", // for deploy to gh-pages base = "./"
  preview: "RoyalTeam",
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: [
      "vite-plugin-handlebars",
      "@spiriit/vite-plugin-svg-spritemap",
      // "rollup-plugin-critical",
      "vite-plugin-html",
    ],
  },
  build: {
    // emit manifest so PHP can find the hashed files
    manifest: true,
    // outDir: "Vite3UI",
    outDir: "RoyalTeam",
    emptyOutDir: true,
    // ssr: false,
    // don't base64 images
    assetsInlineLimit: 0,
    target: "esnext",
    rollupOptions: {
      input: "index.html", // "about.html"], // index.html for UI, src/main.js for WP
      external: ["/data.js"],
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name][extname]";
          }
          if (/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(name)) {
            return "assets/images/[name][extname]"; // Все изображения в папку images
          }
          return "assets/[name][extname]";
        },
      },
      plugins: [
        // critical({
        //   criticalUrl: "./", // Базовый URL (например, '/') для генерации файла "http://localhost:4173/"
        //   criticalBase: "./Vite3UI/", // Папка для хранения сгенерированного критического CSS
        //   criticalPages: [
        //     { uri: "index.html", template: "index" }, // Главная страница
        //     // { uri: "about", template: "about" }, // Другие страницы (если нужно)
        //   ],
        //   width: 1300, // Ширина экрана для генерации критического CSS
        //   height: 900, // Высота экрана
        //   inline: true, // Вставка критического CSS прямо в HTML (иначе создаст отдельные файлы)
        //   // extract: false, // Удаление критических стилей из общего CSS (оставить false, чтобы избежать проблем с флешем контента)
        // }),
      ],
    },
  },
  server: {
    // required to load scripts from custom host
    cors: {
      origin: "*",
    },

    // We need a strict port to match on PHP side.
    strictPort: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "Vite3UI/src"),
    },
  },
  plugins: [
    handlebarsOverride({
      context(pagePath) {
        return contextData[pagePath];
      },
      partialDirectory: [
        resolve(__dirname, "src/partials"),
        resolve(__dirname, "src/partials/layout"),
        resolve(__dirname, "src/partials/sections"),
        resolve(__dirname, "src/partials/components"),
        resolve(__dirname, "src/partials/components/simple"),
        resolve(__dirname, "src/partials/components/complex"),
      ],
    }),
    // handlebars({}),
    // process.env.NODE_ENV === "production" &&
    //   viteImagemin({
    //     onlyAssets: true,
    //     plugins: {
    //       jpg: imageminMozjpeg({ quality: 75 }),
    //       png: imageminPngquant({ quality: [0.6, 0.8] }),
    //       gif: imageminGifsicle({
    //         optimizationLevel: 3, // Уровень сжатия для GIF
    //       }),
    //       svg: imageminSvgo({
    //         plugins: [{ removeViewBox: false }], // Убираем некорректные viewBox из SVG
    //       }),
    //     },
    //     makeWebp: {
    //       plugins: {
    //         jpg: imageminWebp(),
    //         png: imageminWebp(),
    //         gif: imageminWebp(),
    //       },
    //     },
    //   }),
    jsToBottomNoModule(),
    VitePluginSvgSpritemap("./assets/icons/**/*.svg", {
      output: {
        // указываем единственное имя без [hash]
        // filename: "images/spritemap.svg",
        svg4everybody: false,
        svgo: true,
      },
      // inject: {
      //   // если вы вставляете <svg> прямо в HTML
      //   injectTo: "body-prepend",
      // },
    }),
    {
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".php")) {
          server.ws.send({ type: "full-reload", path: "*" });
        }
      },
    },
    {
      name: "serve-json",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/data.json") {
            // console.log("Serving JSON data");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(contextData));
          } else {
            next();
          }
        });
      },
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".json")) {
          console.log("JSON file changed: "`${file}`);
          server.ws.send({ type: "full-reload", path: "*" });
        }
      },
    },
    // generateJsonPlugin(),
  ].filter(Boolean),
});
