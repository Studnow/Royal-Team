export default {
  meta: {
    title: "Название страницы",
    description: "Описание страницы",
    theme: "mytheme", // тема по умолчанию
    favicon: "/fire1.svg",
    ogImage: "/assets/img/og-image.jpg",
    ogUrl: "/",
    font: "@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap');",
  },
  layout: {
    // "basic",
    header: true,
    footer: true, // если не нужен — просто убрать
    mieleFooter: false, // если не нужен — просто убрать
    drawer: true,
    modal: false,
  },
  // --- вот здесь массив
  sections: [
    // "iconsSortingSection",
    // "testimonials",
    "hero",
    // "about",
    // "howitwork",
    // "brandImages",
    // "reviews",
    "equipment",
    "price",
    "promo",
    "faq",
    // "slider",
    // "section",
    // "test",
    // "cards",
    // "price",
    // "form",
  ],
};
