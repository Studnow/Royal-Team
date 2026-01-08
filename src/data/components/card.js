import button from "./button.js"
import picture from "./picture.js"
import heading from "./heading.js"
// import { headingHero } from "./heading.js"

export const card = {
  type: "card",
  cardClass: "bg-base-100",
  cardFigureClass: "",
  cardBodyClass: "card-body",
  cardPicture: true,
  cardActions: true,
  heading: {
    ...heading, titleClass: "text-h3-clamp", titleLevel: "3", description: "Карточка", descriptionClass: "text-body"
  },
  picture,
  button
};
export const cardSlide = {
  type: "card",
  cardClass: "image-full bg-base-100 rounded-none h-full",
  cardBodyClass: "card-body space-y-5 lg:justify-center",
  cardFigureClass: "order-3 w-full lg:order-2 lg:w-1/2",
  cardPicture: true,
  cardActions: true,
  heading: {
    ...heading,
    titleClass: "text-h3-clamp",
    titleLevel: "3",
    description: "Карточка",
    descriptionClass: "text-body",
  },
  picture,
  button,
};

// export const cardHero = {
//   type: "card",
//   cardClass:
//     "rounded-none w-full lg:image-full text-center items-center lg:items-start lg:justify-center",
//   cardBodyClass:
//     "card-body space-y-5 mb-5 p-3 lg:p-8 md:mb-[121px] lg:mb-6 items-center lg:justify-start h-full",
//   cardFigureClass: "w-full rounded-none",
//   heading: {
//     ...headingHero,
//   },
//   picture: {
//     ...picture,
//     path: {
//       srcSet: `/assets/images/mobile/`,
//       img: `/assets/images/desktop/`,
//     },
//     name: "item.mobile.name",
//     ext: "item.mobile.ext",
//     class: "rounded-none mb-6",
//     alt: "Раковина из бетона",
//   },
//   button: {
//     ...button,
//     class: " btn-accent rounded-full",
//     icon: false,
//     text: "Подробнее",
//   },
// };

export default card;