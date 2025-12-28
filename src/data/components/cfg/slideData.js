import { card } from "../card.js";
import cloneDeep from "lodash.clonedeep";
import picture from "../picture.js";
import button from "../button.js";

// const descriptions = [
//   { img: "waterfall.png" },
//   { img: "waterfall.png" },
// ];

// export const slideData = descriptions.map((item, i) => ({
//   ...card,
//   cardClass: "bg-secondary h-full",
//   cardBodyClass: "card-body h-full 2xl:mb-44",
//   cardFigureClass: "flex-col-reverse md:flex-row-reverse",
//   cardHeading: {
//     ...card.cardHeading,
//     titleLevel: "2",
//     title: "Раковины и мойки из бетона",
//     description: "Эксклюзивная раковина, которая подчеркнет безупречный вкус и стиль своего владельца",
//   },
//   button,
//   picture: {
//     ...picture,
//     class: "w-full h-full object-cover",
//     name: item.img.split(".")[0],
//     ext: item.img.split(".")[1],
//     width: "640",
//     height: "640",
//   }
// }));
// export const slideData = Array(4).fill(card);
export const slideData = Array(6)
  .fill(null)
  .map(() => cloneDeep(card));

export default slideData;