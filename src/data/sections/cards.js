import heading from "../dataConfig/content/heading";

import { generateCards } from "../../../assets/Hbs-helpers";
import { card } from "../components/card.js";

export default {
  template: "cards",
  generate: generateCards(6),
  sectionClass: "cards flex flex-col items-center justify-center",
  sectionContentClass: "grid grid-cols-1 md:grid-cols-12 gap-6 place-items-center",
  sectionFooterClass: "",
  heading: {
    ...heading,
    container: true,
    titleLevel: "2",
    title: "Секция карточек",
    description: false,
    class: {
      container: "",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl",
    },
  },
  components: [
    {
      ...card,
    },
    {
      ...card,
    },
    {
      ...card,
    },
    {
      ...card,
    },
  ],
  footer: "this is footer",
};
