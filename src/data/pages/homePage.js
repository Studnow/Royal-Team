import { buildPage } from "../../utils/buildPage";

import pageConfig from "../../config/pagesConfig";
// import pageData from "./home/homePageData";
// import pageStyles from "./home/homePageStyles";
import { sectionsMap } from "../../config/sections";
import { layoutsMap } from "../../config/layouts";


export default buildPage({
  pageId: "homePage",
  pageConfig,
  // pageData,
  // pageStyles,
  sectionsMap,
  layoutsMap,
});

