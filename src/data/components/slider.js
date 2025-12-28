// cfg
import sliderParts from "../components/cfg/sliderParts.js";
import { slideData } from "../components/cfg/slideData.js";

export default {
  type: "splide-slider",
  id: "main-slider",
  fullWidth: true,
  sliderParts,
  slides: {
    // individual data for slider cards
    slideData,
  },
};
