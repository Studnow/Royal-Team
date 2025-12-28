// src/data/data.js
// import indexPage from "./pages/index.js";
// import aboutPage from "./pages/about.js";

// export const contextData = {
//   "/index.html": indexPage,
//   "/about.html": aboutPage,
// };

import * as pages from "./pages";

export const contextData = Object.fromEntries(
  Object.entries(pages).map(([name, module]) => [
    `/${name.replace(/Page$/, "").toLowerCase()}.html`,
    module.default || module,
  ])
);