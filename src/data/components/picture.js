export default {
  type: "picture",
  img: true, // if true = img, false = picture
  alt: "picture",
  modern: true,
  src: { path: "assets/placeholders/cards/", item: { name: "3x3_card", ext: "jpg" } },
  srcSet: {
    path: "assets/placeholders/avatars/",
    items: [{ item: { name: "avatar-left", ext: "png" }, size: "768w" }],
  },
  placeholderType: "cards" || "banners" || "icons" || "backgrounds" || "avatars",
  class: "w-full h-auto",
  w: "786",
  h: "452",
};
