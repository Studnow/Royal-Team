export default {
  meta: {
    title: "Название страницы",
    description: "Описание страницы",
    theme: "mytheme", // тема по умолчанию
    favicon: "/fire1.svg",
    ogImage: "/assets/img/og-image.jpg",
    ogUrl: "/",
  },
  layout: {
    // "basic",
    header: true,
    footer: true, // если не нужен — просто убрать
    mieleFooter: true, // если не нужен — просто убрать
    drawer: false,
    modal: true,
  },
  // --- вот здесь массив
  sections: [
    // "iconsSortingSection",
    // "testimonials",
    "hero",
    "slider",
    "section",
    "test",
    "cards",
    "about",
    "price",
    "form",
  ],
};
