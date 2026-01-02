export default {
  sectionName: {
    // СТРОКИ
    title: "Section",
    description: "description",
    captionBottom: "Caption text",
    buttonText: "Отправить",
    phone: "",

    // Заголовок секции
    heading: {
      title: "Section",
      description: "description",
      captionBottom: "Caption text",
      buttonText: "Отправить",
      phone: "",
    },

    // ОБЪЕКТ
    logo: { name: "placeholders/avatars/avatar-left", ext: "png" },
    icon: { name: "", ext: "svg", alt: "" },
    link: { text: "link example" },
    text: { phone: "", lang: [""] },

    // ПРОСТОЙ МАССИВ
    navLinks: [""],

    // МАССИВ ОБЪЕКТОВ
    images: [{ name: "hero-banner-360x200", ext: "jpg" }],

    items: [
      {
        title: "",
        description: "",
        alt: "",
        phone: "",
        text: [""],
        icon: { name: "", ext: "svg", alt: "" },
        imageD: { name: "", ext: "png" },
        imageM: { name: "", ext: "png" },
      },
    ],

    // ВЛОЖЕННАЯ СТРУКТУРА
    nested: {
      items: [
        {
          title: "Title",
          description: "description",
          text: ["dlfk", "ldif"],
          phone: "",
          icon: { id: "", ext: "svg" },
          image: { name: "hero-banner-360x200", ext: "jpg" },
          buttonText: "Перейти",
        },
        {
          title: "Title 2",
          description: "description 2",
          text: ["dlfk", "ldif"],
          phone: "",
          icon: { id: "", ext: "svg" },
          image: { name: "hero-banner-360x200", ext: "jpg" },
          buttonText: "Перейти",
        },
        {
          title: "Title 3",
          description: "description 3",
          text: ["dlfk", "ldif"],
          phone: "",
          icon: { id: "", ext: "svg" },
          image: { name: "hero-banner-360x200", ext: "jpg" },
          buttonText: "Перейти",
        },
      ],
      img: {
        src: { path: "assets/images/", items: [{ name: "hero-banner-360x200", ext: "jpg" }] },
        alt: "Payment After Assignment",
      },
    },

    icons: {
      start: [{ name: "", ext: "" }],
      end: [{ name: "", ext: "" }],
    },
  },
};
