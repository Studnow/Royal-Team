import heading from "../../data/components/heading.js";
import { sectionStyles } from "../defaultStyles/sectionStyle.js";
import { card } from "../../data/components/card.js";
import button from "../../data/components/button.js";

export default {
  template: "section",
  fullWidth: false,
  style: { ...sectionStyles.wide },
  heading,
  colClass: "col-span-3",
  components: [card, button],
  // {
  // colClass: "col-span-3",
  // items:
  // },
  footer: false,
};
