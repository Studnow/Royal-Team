import heading from "../../data/components/heading.js";
import { sectionStyles } from "../defaultStyles/sectionStyle.js";
import { card } from "../../data/components/card.js";
import button from "../../data/components/button.js";

export default {
  template: "section",
  fullWidth: false,
  style: { ...sectionStyles.heroTwoColumns },
  // colClass: "col-span-3",
  components: [
    // {
    //   ...heading,
    //   title: "",
    //   description: "",
    //   titleLevel: "1",
    //   titleClass: "text-h1-clamp mb-4",
    //   container: true,
    //   caption: false,
    // },
    // button,
  ],
  // {
  // colClass: "col-span-3",
  // items:
  // },
  footer: false,
};
