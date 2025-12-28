import { buildPage } from "../../utils/buildPage";

import pageConfig from "../../config/pagesConfig/aboutPage";
import pageData from "../sections/cfg/test/aboutPageData";
import pageStyles from "../sections/cfg/test/aboutPageStyles";
import { sectionsMap } from "../../config/sections";
import { layoutsMap } from "../../config/layouts";

export default buildPage({
  pageId: "aboutPage",
  pageConfig,
  pageData,
  pageStyles,
  sectionsMap,
  layoutsMap,
});
