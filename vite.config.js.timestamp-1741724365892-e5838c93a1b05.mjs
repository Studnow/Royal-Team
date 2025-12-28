// vite.config.js
import { defineConfig } from "file:///D:/Work/CMS/WordPress/OSP/ViteWP/wp-content/themes/Vite-UI-WP/node_modules/vite/dist/node/index.js";
import fs from "fs";
import path from "path";
import handlebars from "file:///D:/Work/CMS/WordPress/OSP/ViteWP/wp-content/themes/Vite-UI-WP/node_modules/vite-plugin-handlebars/dist/index.js";
import { resolve } from "path";
import VitePluginSvgSpritemap from "file:///D:/Work/CMS/WordPress/OSP/ViteWP/wp-content/themes/Vite-UI-WP/node_modules/@spiriit/vite-plugin-svg-spritemap/dist/index.js";

// src/data/components/dynForm.js
var dynForm_default = {
  form: {
    method: "",
    // get, post, dialog (for close dialog, not submit)
    heading: {
      container: true,
      titleLevel: "3",
      title: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0447\u0435\u043A-\u043B\u0438\u0441\u0442 \u043F\u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0435 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
      description: false,
      class: {
        containerClass: "",
        title: "lg:w-1/2 text-3xl lg:text-4xl",
        description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl"
      }
    },
    formClass: "gap-4 flex flex-col md:flex-row lg:w-[55%] mb-4",
    controlClass: "",
    img: {
      modern: "/assets/img/compressed/form_1.webp",
      path: "/assets/img/compressed/form_1.png",
      title: "Tablet & pen",
      class: "relative right-10 md:absolute lg:right-10 xl:-top-10 md:w-80 md:hidden lg:block lg:w-1/3",
      w: "786",
      h: "452"
    },
    fields: {
      Email: false,
      Name: true,
      Phone: true,
      button: true,
      check: false,
      radio: false,
      select: false,
      file: false,
      range: false,
      rating: false,
      text: false,
      textArea: false,
      toggle: false
    },
    placeholder: {
      name: "\u0418\u043C\u044F",
      phone: "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"
    },
    submit: { text: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0447\u0435\u043A-\u043B\u0438\u0441\u0442", class: "btn btn-primary text-base-100 text-base" }
  },
  form_2: {
    heading: {
      container: true,
      titleLevel: "3",
      title: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0447\u0435\u043A-\u043B\u0438\u0441\u0442 \u043F\u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0435 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
      description: false,
      class: {
        containerClass: "",
        title: "mb-12 lg:w-1/2",
        description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl"
      }
    },
    formClass: "gap-4 flex flex-col md:flex-row max-w-screen-lg",
    controlClass: "",
    img: {
      modern: "/assets/img/compressed/form_2.webp",
      path: "/assets/img/compressed/form_2.png",
      title: "Tablet & pen",
      class: "relative md:absolute lg:right-10 lg:-top-10 md:hidden lg:block lg:w-1/3 xl:w-1/4",
      w: "786",
      h: "452"
    },
    fields: {
      Email: false,
      Name: true,
      Phone: true,
      button: true,
      check: false,
      radio: false,
      select: false,
      file: false,
      range: false,
      rating: false,
      text: false,
      textArea: false,
      toggle: false
    },
    placeholder: {
      name: "\u0418\u043C\u044F",
      phone: "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"
    },
    submit: { text: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0447\u0435\u043A-\u043B\u0438\u0441\u0442", class: "btn btn-primary text-base-100 lg:text-lg" }
  }
};

// src/data/layout/modal.js
var modal_default = {
  class: "mb-4 px-6 mx-auto",
  heading: {
    container: true,
    titleLevel: 3,
    title: "Hello modalk",
    description: "Press ESC or button to close this window",
    class: { containerClass: "", title: "", description: "" }
  },
  body: { form: true, modalForm: dynForm_default },
  footer: ""
};

// src/data/components/pagination.js
var pagination_default = {
  paginationName: "my_pagination",
  pages: [
    { number: 1, state: "active" },
    { number: 2, state: "" },
    { number: 3, state: "" },
    { number: 4, state: "" },
    { number: 5, state: "" }
  ],
  currentPage: 1
};

// src/data/components/rating.js
var rating_default = {
  ratingName: "my_rating",
  ratings: [
    { class: "mask mask-star-2 bg-orange-400", name: "rating-1", state: "" },
    { class: "mask mask-star-2 bg-orange-400", name: "rating-1", state: "checked" },
    { class: "mask mask-star-2 bg-orange-400", name: "rating-1", state: "" },
    { class: "mask mask-star-2 bg-orange-400", name: "rating-1", state: "" },
    { class: "mask mask-star-2 bg-orange-400", name: "rating-1", state: "" }
  ]
};

// src/data/components/tooltip.js
var tooltip_default = {
  tooltipName: "my_tooltip",
  tooltips: [
    { content: "Tooltip content 1", position: "top", state: "" },
    { content: "Tooltip content 2", position: "right", state: "" },
    { content: "Tooltip content 3", position: "bottom", state: "" },
    { content: "Tooltip content 4", position: "left", state: "" }
  ],
  tooltip: { content: "Tooltip content 1", position: "tooltip-right", state: "" }
};

// src/data/components/carousel.js
var carousel_default = {
  carouselName: "my_carousel",
  slides: [
    { content: "Slide 1", state: "active" },
    { content: "Slide 2", state: "" },
    { content: "Slide 3", state: "" },
    { content: "Slide 3", state: "" },
    { content: "Slide 3", state: "" },
    { content: "Slide 3", state: "" }
  ],
  currentSlide: 1
};

// src/data/components/countdown.js
var countdown_default = {
  countdownName: "my_countdown",
  targetDate: /* @__PURE__ */ new Date("2025-12-31T23:59:59")
};

// src/data/components/timeline.js
var timeline_default = {
  timelineName: "my_timeline",
  events: [
    {
      start: "1984",
      middle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
               </svg>`,
      end: "First Macintosh computer"
    },
    {
      start: "1998",
      middle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
               </svg>`,
      end: "iMac"
    },
    {
      start: "2001",
      middle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
               </svg>`,
      end: "iPod"
    },
    {
      start: "2007",
      middle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
               </svg>`,
      end: "iPhone"
    },
    {
      start: "2015",
      middle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
               </svg>`,
      end: "Apple Watch"
    }
  ]
};

// src/data/sections/section.js
var section_default = {
  pagination: pagination_default,
  rating: rating_default,
  tooltip: tooltip_default,
  carousel: carousel_default,
  countdown: countdown_default,
  timeline: timeline_default
};

// src/data/dataConfig/pageConfig.js
var pageConfig_default = {
  indexPage: {
    meta: {
      title: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
      description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
      favicon: "/fire1.svg",
      ogImage: "/assets/img/og-image.jpg",
      ogUrl: "/"
    },
    layout: {
      basic: true,
      header: true,
      footer: true,
      drawer: false,
      modal: true
    },
    sections: {
      section: false,
      hero: true,
      cards: true,
      about: false,
      slider: true,
      price: true,
      form: true
    }
  },
  aboutPage: {
    meta: {
      title: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
      description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
      favicon: "/fire1.svg",
      ogImage: "/assets/img/og-image.jpg",
      ogUrl: "/"
    },
    layout: {
      drawer: false,
      header: false,
      footer: false,
      basic: true,
      modal: true
    },
    sections: {
      hero: true,
      cards: true,
      about: true,
      slider: true,
      price: true
    }
  }
};

// src/data/sections/about.js
var about_default = {
  template: "about",
  class: "about",
  title: "We are the champions",
  description: "Around the world",
  cardBImg: { alt: "Card image", class: "rounded-lg", path: "/assets/img/waterfall.png" }
};

// assets/Hbs-helpers.js
import Handlebars from "file:///D:/Work/CMS/WordPress/OSP/ViteWP/wp-content/themes/Vite-UI-WP/node_modules/handlebars/lib/index.js";
Handlebars.registerHelper("times", function(n, block) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += block.fn({ index: i });
  }
  return result;
});
Handlebars.registerHelper("isArray", function(value, options) {
  if (Array.isArray(value)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
Handlebars.registerHelper("eq", function(a, b) {
  return a === b;
});
Handlebars.registerHelper("incrementedIndex", function(index) {
  return index + 1;
});

// src/data/sections/cards.js
var cards_default = {
  template: "cards",
  generate: false,
  //generateCards(6),
  wrapperClass: "cards grid gap-12 md:grid-cols-2 xl:grid-cols-3 md:items-center",
  heading: {
    container: true,
    titleLevel: "2",
    title: "\u0427\u0442\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C",
    description: false,
    class: {
      container: "",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl"
    }
  },
  cards: [
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "\u041D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: ""
        }
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg"
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!"
    },
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u043E\u0431\u044A\u0435\u043A\u0442 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: ""
        }
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg"
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!"
    },
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: ""
        }
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg"
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!"
    },
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: ""
        }
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg"
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!"
    }
  ]
};

// src/data/sections/hero.js
var hero_default = {
  template: "hero",
  class: "hero min-h-[768px] place-content-start max-w-screen-2xl md:translate-y-24",
  classContent: "hero-content justify-start flex-col md:flex-row text-center md:text-left xl:max-w-4xl w-full",
  heading: {
    titleLevel: "1",
    title: "\u042E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u043A\u0443\u043F\u043A\u043E\u0439",
    description: "\u0412\u0441\u0435\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438, \u043F\u0440\u043E\u0434\u0430\u0432\u0446\u0430, \u043F\u0440\u0430\u0432 3-\u043B\u0438\u0446 \u0438 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
    class: {
      containerClass: "",
      title: "mb-12 text-3xl lg:text-4xl xl:text-6xl",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl"
    }
  },
  button: { btnClass: "btn btn-primary text-base-100 w-52", text: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443" },
  heroCards: [
    {
      class: "w-32 h-20 px-8 pt-8",
      path: "/assets/icons/hero-icons/shield.svg",
      title: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E",
      description: "\u0412\u0441\u0435\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u044F\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430\xA0\u043F\u043E \u0431\u0430\u0437\u0430\u043C \u0438 \u0440\u0435\u0435\u0441\u0442\u0440o\u043C"
    }
  ]
};

// src/data/sections/price.js
var price_default = {
  template: "price",
  class: "price container mx-auto mb-16 bg-base-200 rounded-xl",
  heading: {
    container: false,
    titleLevel: 3,
    title: "price",
    description: "desc",
    class: { containerClass: "", title: "", description: "" }
  },
  content: {
    class: "gap-8 grid lg:grid-cols-2 place-items-center h-auto",
    col1: "grid gap-8 py-4",
    col2: "bg-base-100 rounded-t-full"
  },
  buttons: [
    {
      text: "\u0426\u0435\u043D\u0430: 15 000 \u0440\u0443\u0431\u043B\u0435\u0439",
      class: "btn btn-outline btn-accent btn-wide bg-base-100 hover:bg-accent hover:border-accent"
    },
    {
      text: "\u0412\u043C\u0435\u0441\u0442\u043E 33 000 \u0440\u0443\u0431\u043B\u0435\u0439",
      class: "btn btn-disabled btn-wide !bg-base-100 !bg-opacity-60 !text-opacity-50 relative cross-out"
    },
    { text: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C", class: "btn btn-accent btn-wide" }
  ],
  img: {
    alt: "sale",
    modern: "/assets/img/compressed/sale-img.webp",
    path: "/assets/img/compressed/sale-img.png",
    class: "bg-base-100 rounded-t-full"
  }
};

// src/data/sections/slider.js
var slider_default = {
  template: "slider",
  class: "slider container mx-auto mb-16",
  heading: {
    container: true,
    titleLevel: "3",
    title: "slider",
    description: false,
    class: {
      containerClass: "slider",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl"
    }
  },
  sliderCommon: {
    // common data for slider cards
    customControl: { control: true, controlClass: "", controlIcon: "arrow", iconClass: "text-base-100" },
    pagination: {},
    icon: "play"
  },
  slides: {
    // individual data for slider cards
    slideData: [
      {
        cardBImg: {
          title: "Card 1 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_1.webp",
          path: "/assets/img/compressed/video-preview/Video_1.jpg",
          w: "786",
          h: "452"
        },
        cardBody: false
        // {
        // cardBTitle: "",
        // cardBDesc: "",
        // cardBBtn: false,
        // },
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_2.webp",
          path: "/assets/img/compressed/video-preview/Video_2.jpg",
          w: "786",
          h: "452"
        },
        cardBody: false
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_2.webp",
          path: "/assets/img/compressed/video-preview/Video_1.jpg",
          w: "786",
          h: "452"
        },
        cardBody: false
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_1.webp",
          path: "/assets/img/compressed/video-preview/Video_2.jpg",
          w: "786",
          h: "452"
        },
        cardBody: false
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_2.webp",
          path: "/assets/img/compressed/video-preview/Video_1.jpg",
          w: "786",
          h: "452"
        },
        cardBody: false
      }
    ]
  }
};

// src/data/sections/form.js
var form_default = {
  template: "form",
  heading: {
    container: true,
    titleLevel: "2",
    title: "\u0421\u0435\u043A\u0446\u0438\u044F \u0444\u043E\u0440\u043C\u044B",
    description: false,
    class: {
      container: "",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl"
    }
  }
};

// src/data/dataConfig/sections.js
var sections_default = {
  about: about_default,
  cards: cards_default,
  hero: hero_default,
  price: price_default,
  slider: slider_default,
  section: section_default,
  form: form_default
};

// src/data/components/menu.js
var menu_default = {
  menuClass: "menu menu-horizontal px-1 hidden lg:flex text-base-100",
  menuSmClass: "menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",
  items: { before: ["Home", "About"], after: ["Contacts", "Prices"] },
  sub: {
    subHeading: "Vehicles",
    menuClass: "p-2 bg-base-200 w-36 z-10 text-primary-content",
    menuSmClass: "p-2 bg-base-100 w-36 z-10",
    listItems: ["Chevrolet", "my Car", "Your Car"]
  }
};

// src/data/layout/header.js
var header_default = {
  navbar: {
    headerClass: " bg-info",
    containerClass: " mx-auto py-6",
    navbarClass: " bg-transparent justify-between",
    navbarStart: " w-1/6 lg:w-1/3",
    navbarCenter: " flex w-1/2 lg:1/2 justify-center",
    navbarEnd: " w-1/4 lg:w-1/4"
  },
  logo: {
    containerClass: "btn btn-link text-neutral no-underline text-base flex justify-start items-center w-12 px-0 md:w-full lg:px-2",
    img: "/logo.png",
    imgClass: "w-12",
    text: "\u0413\u0438\u0434 \u043F\u043E \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438",
    spanClass: "hidden lg:inline-block text-sm xl:text-base",
    w: "48",
    h: "48"
  },
  center: {
    components: { showMenu: true, showContacts: false },
    menu: menu_default,
    list: {
      class: "flex justify-start w-full lg:justify-center",
      "list-items": [
        {
          link: true,
          class: "btn btn-link no-underline flex items-start p-2 gap-2 border border-bottom border-2",
          icon: { id: "envelope", w: "36", h: "36", iconClass: "", containerClass: "icon" },
          span: { text: "+7 978 221 26 88", class: "border-b-2 border-accent py-1 hidden md:block" },
          href: "tel:+7 978 221 26 88"
        },
        {
          link: true,
          class: "btn btn-link no-underline flex items-start p-2 gap-2",
          icon: { id: "phone", w: "36", h: "36", iconClass: "", containerClass: "icon" },
          span: { text: "info@gidrealter.ru", class: "border-b-2 border-accent py-1 hidden md:block" },
          href: "mailto: info@gidrealter.ru"
        }
      ]
    }
  },
  right: {
    class: "btn btn-outline bg-base-100 text-xs md:text-base text-accent border-2 hover:bg-accent hover:border-accent",
    text: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A",
    drawer: false
  }
};

// src/data/layout/basic.js
var basic_default = {};

// src/data/layout/footer.js
var footer_default = {
  containerClass: "footer bg-base-100 text-center place-items-center text-base-content p-10",
  logo: { img: "/logo.png", text: "\u0413\u0438\u0434 \u043F\u043E \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438", class: "text-sm xl:text-base" },
  socialClass: "w-16 h-16",
  social: [
    { title: "yt", href: "#s", icon: "/assets/icons/social-icons/yt.svg" },
    { title: "vk", href: "#s", icon: "/assets/icons/social-icons/vk.svg" },
    { title: "ig", href: "#s", icon: "/assets/icons/social-icons/instagram.svg" },
    { title: "fb", href: "#s", icon: "/assets/icons/social-icons/fb.svg" },
    { title: "tg", href: "#s", icon: "/assets/icons/social-icons/tg.svg" },
    { title: "ok", href: "#s", icon: "/assets/icons/social-icons/ok.svg" }
  ],
  business: ["\u0418\u041F \u0422\u0432\u0435\u0440\u0434\u043E\u0445\u043B\u0435\u0431 \u0415.\u0412.", "\u0418\u041D\u041D 920158336626"],
  policy: ["\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438", "Copyright (c) 202"]
};

// src/data/components/accordion.js
var accordion_default = {
  class: "mb-4 px-6 mx-auto",
  heading: {
    container: true,
    titleLevel: 3,
    title: "My Accordion",
    description: "The accordion is only open one at a time.",
    class: { containerClass: "", title: "", description: "" }
  },
  body: [
    {
      title: "How do I create an account?",
      text: 'Click the "Sign Up" button in the top right corner and follow the registration process.'
    },
    {
      title: "I forgot my password. What should I do?",
      text: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
    },
    {
      title: "How do I update my profile information?",
      text: 'Go to "My Account" settings and select "Edit Profile" to make changes.'
    }
  ]
};

// src/data/layout/drawer.js
var drawer_default = {
  show: false,
  tabName: "my_tabs",
  tabs: [
    { tabLabel: "Tab 1", checked: "", content: "Tab content 1" },
    { tabLabel: "Tab 2", checked: "checked", content: "Tab content 2" },
    { tabLabel: "Tab 3", checked: "", content: "Tab content 3" },
    { tabLabel: "Tab 4", checked: "", content: "Tab content 4" }
  ],
  accordion: accordion_default
};

// src/data/dataConfig/layout.js
var layout_default = {
  basic: basic_default,
  header: header_default,
  footer: footer_default,
  modal: modal_default,
  drawer: drawer_default
};

// src/data/pages/index.js
var sections = {};
Object.keys(pageConfig_default.indexPage.sections).forEach((key) => {
  if (pageConfig_default.indexPage.sections[key]) {
    sections[key] = sections_default[key];
  }
});
var layout = {};
Object.keys(pageConfig_default.indexPage.layout).forEach((key) => {
  if (pageConfig_default.indexPage.layout[key]) {
    layout[key] = layout_default[key];
  }
});
var pages_default = {
  meta: pageConfig_default.indexPage.meta,
  mainClass: "mb-4 px-6 mx-auto",
  layout,
  sections
  // headerContext: {
  //   menu: layout.header.center.menu, // упрощённый вид для передачи в компонент
  // },
};

// src/data/data.js
var contextData = {
  "/index.html": { ...pages_default }
};

// vite.config.js
import { createHtmlPlugin } from "file:///D:/Work/CMS/WordPress/OSP/ViteWP/wp-content/themes/Vite-UI-WP/node_modules/vite-plugin-html/dist/index.mjs";
import critical from "file:///D:/Work/CMS/WordPress/OSP/ViteWP/wp-content/themes/Vite-UI-WP/node_modules/rollup-plugin-critical/dist/index.js";
var __vite_injected_original_dirname = "D:\\Work\\CMS\\WordPress\\OSP\\ViteWP\\wp-content\\themes\\Vite-UI-WP";
var isProduction = process.env.NODE_ENV === "production";
function handlebarsOverride(options) {
  const plugin = handlebars(options);
  delete plugin.handleHotUpdate;
  return plugin;
}
var jsToBottomNoModule = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      html = html.replace(`type="module" crossorigin`, "");
      let scriptTag = html.match(/<script[^>]*>(.*?)<\/script[^>]*>/)[0];
      html = html.replace(scriptTag, "");
      html = html.replace("<!-- # INSERT SCRIPT HERE -->", scriptTag);
      return html;
    }
  };
};
function generateJsonPlugin() {
  return {
    name: "generate-json",
    buildEnd() {
      const outputPath = path.resolve(__vite_injected_original_dirname, "../dist/assets/data/combinedData.json");
      const jsonData = JSON.stringify(contextData, null, 2);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, jsonData, "utf-8");
    }
  };
}
var vite_config_default = defineConfig({
  base: isProduction ? "./" : "/",
  // for deploy to gh-pages base = "./"
  css: {
    devSourcemap: true
  },
  optimizeDeps: {
    include: [
      "vite-plugin-handlebars",
      "@spiriit/vite-plugin-svg-spritemap",
      // "rollup-plugin-critical",
      "vite-plugin-html"
    ]
  },
  build: {
    // emit manifest so PHP can find the hashed files
    manifest: isProduction ? true : false,
    // outDir: "Vite3UI",
    outDir: "dist",
    emptyOutDir: true,
    // ssr: false,
    // don't base64 images
    assetsInlineLimit: 0,
    target: "esnext",
    rollupOptions: {
      input: "src/main.js",
      // index.html for UI, src/main.js for WP
      external: ["/data.js"],
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name][extname]";
          }
          if (/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(name)) {
            return "assets/images/[name][extname]";
          }
          return "assets/[name][extname]";
        }
      },
      plugins: [
        // critical({
        //   criticalUrl: "./", // Базовый URL (например, '/') для генерации файла "http://localhost:4173/"
        //   criticalBase: "./Vite3UI/", // Папка для хранения сгенерированного критического CSS
        //   criticalPages: [
        //     { uri: "index.html", template: "index" }, // Главная страница
        //     // { uri: "about", template: "about" }, // Другие страницы (если нужно)
        //   ],
        //   width: 1300, // Ширина экрана для генерации критического CSS
        //   height: 900, // Высота экрана
        //   inline: true, // Вставка критического CSS прямо в HTML (иначе создаст отдельные файлы)
        //   // extract: false, // Удаление критических стилей из общего CSS (оставить false, чтобы избежать проблем с флешем контента)
        // }),
      ]
    }
  },
  server: {
    // required to load scripts from custom host
    cors: {
      origin: "*"
    },
    // We need a strict port to match on PHP side.
    strictPort: true,
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "Vite3UI/src")
    }
  },
  plugins: [
    handlebarsOverride({
      context(pagePath) {
        return contextData[pagePath];
      },
      partialDirectory: [
        resolve(__vite_injected_original_dirname, "src/partials"),
        resolve(__vite_injected_original_dirname, "src/partials/layout"),
        resolve(__vite_injected_original_dirname, "src/partials/sections"),
        resolve(__vite_injected_original_dirname, "src/partials/components"),
        resolve(__vite_injected_original_dirname, "src/partials/components/simple"),
        resolve(__vite_injected_original_dirname, "src/partials/components/complex")
      ]
    }),
    // handlebars({}),
    // process.env.NODE_ENV === "production" &&
    //   viteImagemin({
    //     onlyAssets: true,
    //     plugins: {
    //       jpg: imageminMozjpeg({ quality: 75 }),
    //       png: imageminPngquant({ quality: [0.6, 0.8] }),
    //       gif: imageminGifsicle({
    //         optimizationLevel: 3, // Уровень сжатия для GIF
    //       }),
    //       svg: imageminSvgo({
    //         plugins: [{ removeViewBox: false }], // Убираем некорректные viewBox из SVG
    //       }),
    //     },
    //     makeWebp: {
    //       plugins: {
    //         jpg: imageminWebp(),
    //         png: imageminWebp(),
    //         gif: imageminWebp(),
    //       },
    //     },
    //   }),
    jsToBottomNoModule(),
    VitePluginSvgSpritemap("./assets/icons/**/*.svg"),
    {
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".php")) {
          server.ws.send({ type: "full-reload", path: "*" });
        }
      }
    },
    {
      name: "serve-json",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/data.json") {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(contextData));
          } else {
            next();
          }
        });
      },
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".json")) {
          console.log("JSON file changed: "`${file}`);
          server.ws.send({ type: "full-reload", path: "*" });
        }
      }
    },
    generateJsonPlugin()
  ].filter(Boolean)
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL2RhdGEvY29tcG9uZW50cy9keW5Gb3JtLmpzIiwgInNyYy9kYXRhL2xheW91dC9tb2RhbC5qcyIsICJzcmMvZGF0YS9jb21wb25lbnRzL3BhZ2luYXRpb24uanMiLCAic3JjL2RhdGEvY29tcG9uZW50cy9yYXRpbmcuanMiLCAic3JjL2RhdGEvY29tcG9uZW50cy90b29sdGlwLmpzIiwgInNyYy9kYXRhL2NvbXBvbmVudHMvY2Fyb3VzZWwuanMiLCAic3JjL2RhdGEvY29tcG9uZW50cy9jb3VudGRvd24uanMiLCAic3JjL2RhdGEvY29tcG9uZW50cy90aW1lbGluZS5qcyIsICJzcmMvZGF0YS9zZWN0aW9ucy9zZWN0aW9uLmpzIiwgInNyYy9kYXRhL2RhdGFDb25maWcvcGFnZUNvbmZpZy5qcyIsICJzcmMvZGF0YS9zZWN0aW9ucy9hYm91dC5qcyIsICJhc3NldHMvSGJzLWhlbHBlcnMuanMiLCAic3JjL2RhdGEvc2VjdGlvbnMvY2FyZHMuanMiLCAic3JjL2RhdGEvc2VjdGlvbnMvaGVyby5qcyIsICJzcmMvZGF0YS9zZWN0aW9ucy9wcmljZS5qcyIsICJzcmMvZGF0YS9zZWN0aW9ucy9zbGlkZXIuanMiLCAic3JjL2RhdGEvc2VjdGlvbnMvZm9ybS5qcyIsICJzcmMvZGF0YS9kYXRhQ29uZmlnL3NlY3Rpb25zLmpzIiwgInNyYy9kYXRhL2NvbXBvbmVudHMvbWVudS5qcyIsICJzcmMvZGF0YS9sYXlvdXQvaGVhZGVyLmpzIiwgInNyYy9kYXRhL2xheW91dC9iYXNpYy5qcyIsICJzcmMvZGF0YS9sYXlvdXQvZm9vdGVyLmpzIiwgInNyYy9kYXRhL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwgInNyYy9kYXRhL2xheW91dC9kcmF3ZXIuanMiLCAic3JjL2RhdGEvZGF0YUNvbmZpZy9sYXlvdXQuanMiLCAic3JjL2RhdGEvcGFnZXMvaW5kZXguanMiLCAic3JjL2RhdGEvZGF0YS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvQ01TL1dvcmRQcmVzcy9PU1AvVml0ZVdQL3dwLWNvbnRlbnQvdGhlbWVzL1ZpdGUtVUktV1Avdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5pbXBvcnQgaGFuZGxlYmFycyBmcm9tIFwidml0ZS1wbHVnaW4taGFuZGxlYmFyc1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IFZpdGVQbHVnaW5TdmdTcHJpdGVtYXAgZnJvbSBcIkBzcGlyaWl0L3ZpdGUtcGx1Z2luLXN2Zy1zcHJpdGVtYXBcIjtcclxuLy8gaW1wb3J0IHZpdGVJbWFnZW1pbiBmcm9tIFwiQHZoZWVtc3RyYS92aXRlLXBsdWdpbi1pbWFnZW1pblwiO1xyXG4vLyBpbXBvcnQgaW1hZ2VtaW5Nb3pqcGVnIGZyb20gXCJpbWFnZW1pbi1tb3pqcGVnXCI7XHJcbi8vIGltcG9ydCBpbWFnZW1pblBuZ3F1YW50IGZyb20gXCJpbWFnZW1pbi1wbmdxdWFudFwiO1xyXG4vLyBpbXBvcnQgaW1hZ2VtaW5HaWZzaWNsZSBmcm9tIFwiaW1hZ2VtaW4tZ2lmc2ljbGVcIjtcclxuLy8gaW1wb3J0IGltYWdlbWluU3ZnbyBmcm9tIFwiaW1hZ2VtaW4tc3Znb1wiO1xyXG4vLyBpbXBvcnQgaW1hZ2VtaW5XZWJwIGZyb20gXCJpbWFnZW1pbi13ZWJwXCI7XHJcblxyXG5pbXBvcnQgeyBjb250ZXh0RGF0YSB9IGZyb20gXCIuL3NyYy9kYXRhL2RhdGFcIjtcclxuaW1wb3J0IEhlbHBlcnMgZnJvbSBcIi4vYXNzZXRzL0hicy1oZWxwZXJzXCI7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcclxuaW1wb3J0IGNyaXRpY2FsIGZyb20gXCJyb2xsdXAtcGx1Z2luLWNyaXRpY2FsXCI7XHJcblxyXG5jb25zdCBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbmNvbnN0IGlzVUkgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZWJhcnNPdmVycmlkZShvcHRpb25zKSB7XHJcbiAgY29uc3QgcGx1Z2luID0gaGFuZGxlYmFycyhvcHRpb25zKTtcclxuICAvLyBDdXJyZW50bHkgaGFuZGxlSG90VXBkYXRlIHNraXBzIGZ1cnRoZXIgcHJvY2Vzc2luZywgd2hpY2ggYnlwYXNzZXNcclxuICAvLyBwb3N0Y3NzIGFuZCBpbiB0dXJuIHRhaWx3aW5kIGRvZXNuJ3QgcGljayB1cCBmaWxlIGNoYW5nZXNcclxuICBkZWxldGUgcGx1Z2luLmhhbmRsZUhvdFVwZGF0ZTtcclxuICByZXR1cm4gcGx1Z2luO1xyXG59XHJcblxyXG5jb25zdCBqc1RvQm90dG9tTm9Nb2R1bGUgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IFwibm8tYXR0cmlidXRlXCIsXHJcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCkge1xyXG4gICAgICBodG1sID0gaHRtbC5yZXBsYWNlKGB0eXBlPVwibW9kdWxlXCIgY3Jvc3NvcmlnaW5gLCBcIlwiKTtcclxuICAgICAgbGV0IHNjcmlwdFRhZyA9IGh0bWwubWF0Y2goLzxzY3JpcHRbXj5dKj4oLio/KTxcXC9zY3JpcHRbXj5dKj4vKVswXTtcclxuICAgICAgLy8gY29uc29sZS5sb2coXCJcXG4gU0NSSVBUIFRBR1wiLCBzY3JpcHRUYWcsIFwiXFxuXCIpO1xyXG4gICAgICBodG1sID0gaHRtbC5yZXBsYWNlKHNjcmlwdFRhZywgXCJcIik7XHJcbiAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoXCI8IS0tICMgSU5TRVJUIFNDUklQVCBIRVJFIC0tPlwiLCBzY3JpcHRUYWcpO1xyXG4gICAgICByZXR1cm4gaHRtbDtcclxuICAgIH0sXHJcbiAgfTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlSnNvblBsdWdpbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogXCJnZW5lcmF0ZS1qc29uXCIsXHJcbiAgICBidWlsZEVuZCgpIHtcclxuICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vZGlzdC9hc3NldHMvZGF0YS9jb21iaW5lZERhdGEuanNvblwiKTtcclxuICAgICAgY29uc3QganNvbkRhdGEgPSBKU09OLnN0cmluZ2lmeShjb250ZXh0RGF0YSwgbnVsbCwgMik7XHJcbiAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmRpcm5hbWUob3V0cHV0UGF0aCksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKG91dHB1dFBhdGgsIGpzb25EYXRhLCBcInV0Zi04XCIpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhgSlNPTiBkYXRhIHdyaXR0ZW4gdG8gJHtvdXRwdXRQYXRofWApO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IGlzUHJvZHVjdGlvbiA/IFwiLi9cIiA6IFwiL1wiLCAvLyBmb3IgZGVwbG95IHRvIGdoLXBhZ2VzIGJhc2UgPSBcIi4vXCJcclxuICBjc3M6IHtcclxuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1xyXG4gICAgICBcInZpdGUtcGx1Z2luLWhhbmRsZWJhcnNcIixcclxuICAgICAgXCJAc3BpcmlpdC92aXRlLXBsdWdpbi1zdmctc3ByaXRlbWFwXCIsXHJcbiAgICAgIC8vIFwicm9sbHVwLXBsdWdpbi1jcml0aWNhbFwiLFxyXG4gICAgICBcInZpdGUtcGx1Z2luLWh0bWxcIixcclxuICAgIF0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgLy8gZW1pdCBtYW5pZmVzdCBzbyBQSFAgY2FuIGZpbmQgdGhlIGhhc2hlZCBmaWxlc1xyXG4gICAgbWFuaWZlc3Q6IGlzUHJvZHVjdGlvbiA/IHRydWUgOiBmYWxzZSxcclxuICAgIC8vIG91dERpcjogXCJWaXRlM1VJXCIsXHJcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxyXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgICAvLyBzc3I6IGZhbHNlLFxyXG4gICAgLy8gZG9uJ3QgYmFzZTY0IGltYWdlc1xyXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDAsXHJcbiAgICB0YXJnZXQ6IFwiZXNuZXh0XCIsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiBcInNyYy9tYWluLmpzXCIsIC8vIGluZGV4Lmh0bWwgZm9yIFVJLCBzcmMvbWFpbi5qcyBmb3IgV1BcclxuICAgICAgZXh0ZXJuYWw6IFtcIi9kYXRhLmpzXCJdLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiB7XHJcbiAgICAgICAgICBpZiAoL1xcLih3b2ZmfHdvZmYyfGVvdHx0dGZ8b3RmKSQvaS50ZXN0KG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImFzc2V0cy9mb250cy9bbmFtZV1bZXh0bmFtZV1cIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICgvXFwuKHBuZ3xqcGU/Z3x3ZWJwfHN2Z3xnaWZ8YXZpZikkL2kudGVzdChuYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJhc3NldHMvaW1hZ2VzL1tuYW1lXVtleHRuYW1lXVwiOyAvLyBcdTA0MTJcdTA0NDFcdTA0MzUgXHUwNDM4XHUwNDM3XHUwNDNFXHUwNDMxXHUwNDQwXHUwNDMwXHUwNDM2XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDRGIFx1MDQzMiBcdTA0M0ZcdTA0MzBcdTA0M0ZcdTA0M0FcdTA0NDMgaW1hZ2VzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gXCJhc3NldHMvW25hbWVdW2V4dG5hbWVdXCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIC8vIGNyaXRpY2FsKHtcclxuICAgICAgICAvLyAgIGNyaXRpY2FsVXJsOiBcIi4vXCIsIC8vIFx1MDQxMVx1MDQzMFx1MDQzN1x1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzOSBVUkwgKFx1MDQzRFx1MDQzMFx1MDQzRlx1MDQ0MFx1MDQzOFx1MDQzQ1x1MDQzNVx1MDQ0MCwgJy8nKSBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDMzXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDM4IFx1MDQ0NFx1MDQzMFx1MDQzOVx1MDQzQlx1MDQzMCBcImh0dHA6Ly9sb2NhbGhvc3Q6NDE3My9cIlxyXG4gICAgICAgIC8vICAgY3JpdGljYWxCYXNlOiBcIi4vVml0ZTNVSS9cIiwgLy8gXHUwNDFGXHUwNDMwXHUwNDNGXHUwNDNBXHUwNDMwIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0NDVcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDQxXHUwNDMzXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDQwXHUwNDM4XHUwNDQwXHUwNDNFXHUwNDMyXHUwNDMwXHUwNDNEXHUwNDNEXHUwNDNFXHUwNDMzXHUwNDNFIFx1MDQzQVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzRVx1MDQzM1x1MDQzRSBDU1NcclxuICAgICAgICAvLyAgIGNyaXRpY2FsUGFnZXM6IFtcclxuICAgICAgICAvLyAgICAgeyB1cmk6IFwiaW5kZXguaHRtbFwiLCB0ZW1wbGF0ZTogXCJpbmRleFwiIH0sIC8vIFx1MDQxM1x1MDQzQlx1MDQzMFx1MDQzMlx1MDQzRFx1MDQzMFx1MDQ0RiBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDZcdTA0MzBcclxuICAgICAgICAvLyAgICAgLy8geyB1cmk6IFwiYWJvdXRcIiwgdGVtcGxhdGU6IFwiYWJvdXRcIiB9LCAvLyBcdTA0MTRcdTA0NDBcdTA0NDNcdTA0MzNcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDRCIChcdTA0MzVcdTA0NDFcdTA0M0JcdTA0MzggXHUwNDNEXHUwNDQzXHUwNDM2XHUwNDNEXHUwNDNFKVxyXG4gICAgICAgIC8vICAgXSxcclxuICAgICAgICAvLyAgIHdpZHRoOiAxMzAwLCAvLyBcdTA0MjhcdTA0MzhcdTA0NDBcdTA0MzhcdTA0M0RcdTA0MzAgXHUwNDREXHUwNDNBXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDMwIFx1MDQzNFx1MDQzQlx1MDQ0RiBcdTA0MzNcdTA0MzVcdTA0M0RcdTA0MzVcdTA0NDBcdTA0MzBcdTA0NDZcdTA0MzhcdTA0MzggXHUwNDNBXHUwNDQwXHUwNDM4XHUwNDQyXHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDNFXHUwNDMzXHUwNDNFIENTU1xyXG4gICAgICAgIC8vICAgaGVpZ2h0OiA5MDAsIC8vIFx1MDQxMlx1MDQ0Qlx1MDQ0MVx1MDQzRVx1MDQ0Mlx1MDQzMCBcdTA0NERcdTA0M0FcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzBcclxuICAgICAgICAvLyAgIGlubGluZTogdHJ1ZSwgLy8gXHUwNDEyXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDMyXHUwNDNBXHUwNDMwIFx1MDQzQVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzRVx1MDQzM1x1MDQzRSBDU1MgXHUwNDNGXHUwNDQwXHUwNDRGXHUwNDNDXHUwNDNFIFx1MDQzMiBIVE1MIChcdTA0MzhcdTA0M0RcdTA0MzBcdTA0NDdcdTA0MzUgXHUwNDQxXHUwNDNFXHUwNDM3XHUwNDM0XHUwNDMwXHUwNDQxXHUwNDQyIFx1MDQzRVx1MDQ0Mlx1MDQzNFx1MDQzNVx1MDQzQlx1MDQ0Q1x1MDQzRFx1MDQ0Qlx1MDQzNSBcdTA0NDRcdTA0MzBcdTA0MzlcdTA0M0JcdTA0NEIpXHJcbiAgICAgICAgLy8gICAvLyBleHRyYWN0OiBmYWxzZSwgLy8gXHUwNDIzXHUwNDM0XHUwNDMwXHUwNDNCXHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzQVx1MDQ0MFx1MDQzOFx1MDQ0Mlx1MDQzOFx1MDQ0N1x1MDQzNVx1MDQ0MVx1MDQzQVx1MDQzOFx1MDQ0NSBcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0JcdTA0MzVcdTA0MzkgXHUwNDM4XHUwNDM3IFx1MDQzRVx1MDQzMVx1MDQ0OVx1MDQzNVx1MDQzM1x1MDQzRSBDU1MgKFx1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzMlx1MDQzOFx1MDQ0Mlx1MDQ0QyBmYWxzZSwgXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzOFx1MDQzN1x1MDQzMVx1MDQzNVx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQ0QyBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzFcdTA0M0JcdTA0MzVcdTA0M0MgXHUwNDQxIFx1MDQ0NFx1MDQzQlx1MDQzNVx1MDQ0OFx1MDQzNVx1MDQzQyBcdTA0M0FcdTA0M0VcdTA0M0RcdTA0NDJcdTA0MzVcdTA0M0RcdTA0NDJcdTA0MzApXHJcbiAgICAgICAgLy8gfSksXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICAvLyByZXF1aXJlZCB0byBsb2FkIHNjcmlwdHMgZnJvbSBjdXN0b20gaG9zdFxyXG4gICAgY29yczoge1xyXG4gICAgICBvcmlnaW46IFwiKlwiLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBXZSBuZWVkIGEgc3RyaWN0IHBvcnQgdG8gbWF0Y2ggb24gUEhQIHNpZGUuXHJcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgcG9ydDogNTE3MyxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIlZpdGUzVUkvc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIGhhbmRsZWJhcnNPdmVycmlkZSh7XHJcbiAgICAgIGNvbnRleHQocGFnZVBhdGgpIHtcclxuICAgICAgICByZXR1cm4gY29udGV4dERhdGFbcGFnZVBhdGhdO1xyXG4gICAgICB9LFxyXG4gICAgICBwYXJ0aWFsRGlyZWN0b3J5OiBbXHJcbiAgICAgICAgcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3BhcnRpYWxzXCIpLFxyXG4gICAgICAgIHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wYXJ0aWFscy9sYXlvdXRcIiksXHJcbiAgICAgICAgcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3BhcnRpYWxzL3NlY3Rpb25zXCIpLFxyXG4gICAgICAgIHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wYXJ0aWFscy9jb21wb25lbnRzXCIpLFxyXG4gICAgICAgIHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9wYXJ0aWFscy9jb21wb25lbnRzL3NpbXBsZVwiKSxcclxuICAgICAgICByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvcGFydGlhbHMvY29tcG9uZW50cy9jb21wbGV4XCIpLFxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgICAvLyBoYW5kbGViYXJzKHt9KSxcclxuICAgIC8vIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiAmJlxyXG4gICAgLy8gICB2aXRlSW1hZ2VtaW4oe1xyXG4gICAgLy8gICAgIG9ubHlBc3NldHM6IHRydWUsXHJcbiAgICAvLyAgICAgcGx1Z2luczoge1xyXG4gICAgLy8gICAgICAganBnOiBpbWFnZW1pbk1vempwZWcoeyBxdWFsaXR5OiA3NSB9KSxcclxuICAgIC8vICAgICAgIHBuZzogaW1hZ2VtaW5QbmdxdWFudCh7IHF1YWxpdHk6IFswLjYsIDAuOF0gfSksXHJcbiAgICAvLyAgICAgICBnaWY6IGltYWdlbWluR2lmc2ljbGUoe1xyXG4gICAgLy8gICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogMywgLy8gXHUwNDIzXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDNEXHUwNDRDIFx1MDQ0MVx1MDQzNlx1MDQzMFx1MDQ0Mlx1MDQzOFx1MDQ0RiBcdTA0MzRcdTA0M0JcdTA0NEYgR0lGXHJcbiAgICAvLyAgICAgICB9KSxcclxuICAgIC8vICAgICAgIHN2ZzogaW1hZ2VtaW5TdmdvKHtcclxuICAgIC8vICAgICAgICAgcGx1Z2luczogW3sgcmVtb3ZlVmlld0JveDogZmFsc2UgfV0sIC8vIFx1MDQyM1x1MDQzMVx1MDQzOFx1MDQ0MFx1MDQzMFx1MDQzNVx1MDQzQyBcdTA0M0RcdTA0MzVcdTA0M0FcdTA0M0VcdTA0NDBcdTA0NDBcdTA0MzVcdTA0M0FcdTA0NDJcdTA0M0RcdTA0NEJcdTA0MzUgdmlld0JveCBcdTA0MzhcdTA0MzcgU1ZHXHJcbiAgICAvLyAgICAgICB9KSxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIG1ha2VXZWJwOiB7XHJcbiAgICAvLyAgICAgICBwbHVnaW5zOiB7XHJcbiAgICAvLyAgICAgICAgIGpwZzogaW1hZ2VtaW5XZWJwKCksXHJcbiAgICAvLyAgICAgICAgIHBuZzogaW1hZ2VtaW5XZWJwKCksXHJcbiAgICAvLyAgICAgICAgIGdpZjogaW1hZ2VtaW5XZWJwKCksXHJcbiAgICAvLyAgICAgICB9LFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgIH0pLFxyXG4gICAganNUb0JvdHRvbU5vTW9kdWxlKCksXHJcbiAgICBWaXRlUGx1Z2luU3ZnU3ByaXRlbWFwKFwiLi9hc3NldHMvaWNvbnMvKiovKi5zdmdcIiksXHJcbiAgICB7XHJcbiAgICAgIGhhbmRsZUhvdFVwZGF0ZSh7IGZpbGUsIHNlcnZlciB9KSB7XHJcbiAgICAgICAgaWYgKGZpbGUuZW5kc1dpdGgoXCIucGhwXCIpKSB7XHJcbiAgICAgICAgICBzZXJ2ZXIud3Muc2VuZCh7IHR5cGU6IFwiZnVsbC1yZWxvYWRcIiwgcGF0aDogXCIqXCIgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogXCJzZXJ2ZS1qc29uXCIsXHJcbiAgICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcclxuICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlcS51cmwgPT09IFwiL2RhdGEuanNvblwiKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU2VydmluZyBKU09OIGRhdGFcIik7XHJcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KGNvbnRleHREYXRhKSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZUhvdFVwZGF0ZSh7IGZpbGUsIHNlcnZlciB9KSB7XHJcbiAgICAgICAgaWYgKGZpbGUuZW5kc1dpdGgoXCIuanNvblwiKSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJKU09OIGZpbGUgY2hhbmdlZDogXCJgJHtmaWxlfWApO1xyXG4gICAgICAgICAgc2VydmVyLndzLnNlbmQoeyB0eXBlOiBcImZ1bGwtcmVsb2FkXCIsIHBhdGg6IFwiKlwiIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBnZW5lcmF0ZUpzb25QbHVnaW4oKSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxjb21wb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGNvbXBvbmVudHNcXFxcZHluRm9ybS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9jb21wb25lbnRzL2R5bkZvcm0uanNcIjtleHBvcnQgZGVmYXVsdCB7XHJcbiAgZm9ybToge1xyXG4gICAgbWV0aG9kOiBcIlwiLCAgLy8gZ2V0LCBwb3N0LCBkaWFsb2cgKGZvciBjbG9zZSBkaWFsb2csIG5vdCBzdWJtaXQpXHJcbiAgICBoZWFkaW5nOiB7XHJcbiAgICAgIGNvbnRhaW5lcjogdHJ1ZSxcclxuICAgICAgdGl0bGVMZXZlbDogXCIzXCIsXHJcbiAgICAgIHRpdGxlOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzMlx1MDQ0Q1x1MDQ0Mlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NEZcdTA0MzJcdTA0M0FcdTA0NDMgXHUwNDM4IFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDdcdTA0MzVcdTA0M0EtXHUwNDNCXHUwNDM4XHUwNDQxXHUwNDQyIFx1MDQzRlx1MDQzRSBcdTA0M0ZcdTA0M0VcdTA0M0FcdTA0NDNcdTA0M0ZcdTA0M0FcdTA0MzUgXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDMyXHUwNDM4XHUwNDM2XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4XCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBmYWxzZSxcclxuICAgICAgY2xhc3M6IHtcclxuICAgICAgICBjb250YWluZXJDbGFzczogXCJcIixcclxuICAgICAgICB0aXRsZTogXCJsZzp3LTEvMiB0ZXh0LTN4bCBsZzp0ZXh0LTR4bFwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIm1iLTEyIGZvbnQtc2FucyBsZzp0ZXh0LTJ4bCBmb250LW5vcm1hbCBtYXgtdy1sZyB4bDptYXgtdy0zeGxcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBmb3JtQ2xhc3M6IFwiZ2FwLTQgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBsZzp3LVs1NSVdIG1iLTRcIixcclxuICAgIGNvbnRyb2xDbGFzczogXCJcIixcclxuICAgIGltZzoge1xyXG4gICAgICBtb2Rlcm46IFwiL2Fzc2V0cy9pbWcvY29tcHJlc3NlZC9mb3JtXzEud2VicFwiLFxyXG4gICAgICBwYXRoOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvZm9ybV8xLnBuZ1wiLFxyXG4gICAgICB0aXRsZTogXCJUYWJsZXQgJiBwZW5cIixcclxuICAgICAgY2xhc3M6IFwicmVsYXRpdmUgcmlnaHQtMTAgbWQ6YWJzb2x1dGUgbGc6cmlnaHQtMTAgeGw6LXRvcC0xMCBtZDp3LTgwIG1kOmhpZGRlbiBsZzpibG9jayBsZzp3LTEvM1wiLFxyXG4gICAgICB3OiBcIjc4NlwiLFxyXG4gICAgICBoOiBcIjQ1MlwiLFxyXG4gICAgfSxcclxuICAgIGZpZWxkczoge1xyXG4gICAgICBFbWFpbDogZmFsc2UsXHJcbiAgICAgIE5hbWU6IHRydWUsXHJcbiAgICAgIFBob25lOiB0cnVlLFxyXG4gICAgICBidXR0b246IHRydWUsXHJcbiAgICAgIGNoZWNrOiBmYWxzZSxcclxuICAgICAgcmFkaW86IGZhbHNlLFxyXG4gICAgICBzZWxlY3Q6IGZhbHNlLFxyXG4gICAgICBmaWxlOiBmYWxzZSxcclxuICAgICAgcmFuZ2U6IGZhbHNlLFxyXG4gICAgICByYXRpbmc6IGZhbHNlLFxyXG4gICAgICB0ZXh0OiBmYWxzZSxcclxuICAgICAgdGV4dEFyZWE6IGZhbHNlLFxyXG4gICAgICB0b2dnbGU6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHBsYWNlaG9sZGVyOiB7XHJcbiAgICAgIG5hbWU6IFwiXHUwNDE4XHUwNDNDXHUwNDRGXCIsXHJcbiAgICAgIHBob25lOiBcIlx1MDQxRFx1MDQzRVx1MDQzQ1x1MDQzNVx1MDQ0MCBcdTA0NDJcdTA0MzVcdTA0M0JcdTA0MzVcdTA0NDRcdTA0M0VcdTA0M0RcdTA0MzBcIixcclxuICAgIH0sXHJcbiAgICBzdWJtaXQ6IHsgdGV4dDogXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0NDNcdTA0NDdcdTA0MzhcdTA0NDJcdTA0NEMgXHUwNDQ3XHUwNDM1XHUwNDNBLVx1MDQzQlx1MDQzOFx1MDQ0MVx1MDQ0MlwiLCBjbGFzczogXCJidG4gYnRuLXByaW1hcnkgdGV4dC1iYXNlLTEwMCB0ZXh0LWJhc2VcIiB9LFxyXG4gIH0sXHJcbiAgZm9ybV8yOiB7XHJcbiAgICBoZWFkaW5nOiB7XHJcbiAgICAgIGNvbnRhaW5lcjogdHJ1ZSxcclxuICAgICAgdGl0bGVMZXZlbDogXCIzXCIsXHJcbiAgICAgIHRpdGxlOiBcIlx1MDQxRVx1MDQ0MVx1MDQ0Mlx1MDQzMFx1MDQzMlx1MDQ0Q1x1MDQ0Mlx1MDQzNSBcdTA0MzdcdTA0MzBcdTA0NEZcdTA0MzJcdTA0M0FcdTA0NDMgXHUwNDM4IFx1MDQzRlx1MDQzRVx1MDQzQlx1MDQ0M1x1MDQ0N1x1MDQzOFx1MDQ0Mlx1MDQzNSBcdTA0NDdcdTA0MzVcdTA0M0EtXHUwNDNCXHUwNDM4XHUwNDQxXHUwNDQyIFx1MDQzRlx1MDQzRSBcdTA0M0ZcdTA0M0VcdTA0M0FcdTA0NDNcdTA0M0ZcdTA0M0FcdTA0MzUgXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDMyXHUwNDM4XHUwNDM2XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4XCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBmYWxzZSxcclxuICAgICAgY2xhc3M6IHtcclxuICAgICAgICBjb250YWluZXJDbGFzczogXCJcIixcclxuICAgICAgICB0aXRsZTogXCJtYi0xMiBsZzp3LTEvMlwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIm1iLTEyIGZvbnQtc2FucyBsZzp0ZXh0LTJ4bCBmb250LW5vcm1hbCBtYXgtdy1sZyB4bDptYXgtdy0zeGxcIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBmb3JtQ2xhc3M6IFwiZ2FwLTQgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtYXgtdy1zY3JlZW4tbGdcIixcclxuICAgIGNvbnRyb2xDbGFzczogXCJcIixcclxuICAgIGltZzoge1xyXG4gICAgICBtb2Rlcm46IFwiL2Fzc2V0cy9pbWcvY29tcHJlc3NlZC9mb3JtXzIud2VicFwiLFxyXG4gICAgICBwYXRoOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvZm9ybV8yLnBuZ1wiLFxyXG4gICAgICB0aXRsZTogXCJUYWJsZXQgJiBwZW5cIixcclxuICAgICAgY2xhc3M6IFwicmVsYXRpdmUgbWQ6YWJzb2x1dGUgbGc6cmlnaHQtMTAgbGc6LXRvcC0xMCBtZDpoaWRkZW4gbGc6YmxvY2sgbGc6dy0xLzMgeGw6dy0xLzRcIixcclxuICAgICAgdzogXCI3ODZcIixcclxuICAgICAgaDogXCI0NTJcIixcclxuICAgIH0sXHJcbiAgICBmaWVsZHM6IHtcclxuICAgICAgRW1haWw6IGZhbHNlLFxyXG4gICAgICBOYW1lOiB0cnVlLFxyXG4gICAgICBQaG9uZTogdHJ1ZSxcclxuICAgICAgYnV0dG9uOiB0cnVlLFxyXG4gICAgICBjaGVjazogZmFsc2UsXHJcbiAgICAgIHJhZGlvOiBmYWxzZSxcclxuICAgICAgc2VsZWN0OiBmYWxzZSxcclxuICAgICAgZmlsZTogZmFsc2UsXHJcbiAgICAgIHJhbmdlOiBmYWxzZSxcclxuICAgICAgcmF0aW5nOiBmYWxzZSxcclxuICAgICAgdGV4dDogZmFsc2UsXHJcbiAgICAgIHRleHRBcmVhOiBmYWxzZSxcclxuICAgICAgdG9nZ2xlOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICBwbGFjZWhvbGRlcjoge1xyXG4gICAgICBuYW1lOiBcIlx1MDQxOFx1MDQzQ1x1MDQ0RlwiLFxyXG4gICAgICBwaG9uZTogXCJcdTA0MURcdTA0M0VcdTA0M0NcdTA0MzVcdTA0NDAgXHUwNDQyXHUwNDM1XHUwNDNCXHUwNDM1XHUwNDQ0XHUwNDNFXHUwNDNEXHUwNDMwXCIsXHJcbiAgICB9LFxyXG4gICAgc3VibWl0OiB7IHRleHQ6IFwiXHUwNDFGXHUwNDNFXHUwNDNCXHUwNDQzXHUwNDQ3XHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQ0N1x1MDQzNVx1MDQzQS1cdTA0M0JcdTA0MzhcdTA0NDFcdTA0NDJcIiwgY2xhc3M6IFwiYnRuIGJ0bi1wcmltYXJ5IHRleHQtYmFzZS0xMDAgbGc6dGV4dC1sZ1wiIH0sXHJcbiAgfSxcclxufTsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcbGF5b3V0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGxheW91dFxcXFxtb2RhbC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9sYXlvdXQvbW9kYWwuanNcIjtpbXBvcnQgbW9kYWxGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL2R5bkZvcm1cIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNsYXNzOiBcIm1iLTQgcHgtNiBteC1hdXRvXCIsXHJcbiAgaGVhZGluZzoge1xyXG4gICAgY29udGFpbmVyOiB0cnVlLFxyXG4gICAgdGl0bGVMZXZlbDogMyxcclxuICAgIHRpdGxlOiBcIkhlbGxvIG1vZGFsa1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiUHJlc3MgRVNDIG9yIGJ1dHRvbiB0byBjbG9zZSB0aGlzIHdpbmRvd1wiLFxyXG4gICAgY2xhc3M6IHsgY29udGFpbmVyQ2xhc3M6IFwiXCIsIHRpdGxlOiBcIlwiLCBkZXNjcmlwdGlvbjogXCJcIiB9LFxyXG4gIH0sXHJcbiAgYm9keTogeyBmb3JtOiB0cnVlLCBtb2RhbEZvcm0gfSxcclxuICBmb290ZXI6IFwiXCIsXHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxjb21wb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGNvbXBvbmVudHNcXFxccGFnaW5hdGlvbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9jb21wb25lbnRzL3BhZ2luYXRpb24uanNcIjtleHBvcnQgZGVmYXVsdCB7XHJcbiAgcGFnaW5hdGlvbk5hbWU6IFwibXlfcGFnaW5hdGlvblwiLFxyXG4gIHBhZ2VzOiBbXHJcbiAgICB7IG51bWJlcjogMSwgc3RhdGU6IFwiYWN0aXZlXCIgfSxcclxuICAgIHsgbnVtYmVyOiAyLCBzdGF0ZTogXCJcIiB9LFxyXG4gICAgeyBudW1iZXI6IDMsIHN0YXRlOiBcIlwiIH0sXHJcbiAgICB7IG51bWJlcjogNCwgc3RhdGU6IFwiXCIgfSxcclxuICAgIHsgbnVtYmVyOiA1LCBzdGF0ZTogXCJcIiB9LFxyXG4gIF0sXHJcbiAgY3VycmVudFBhZ2U6IDEsXHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxjb21wb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGNvbXBvbmVudHNcXFxccmF0aW5nLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL2NvbXBvbmVudHMvcmF0aW5nLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIHJhdGluZ05hbWU6IFwibXlfcmF0aW5nXCIsXHJcbiAgcmF0aW5nczogW1xyXG4gICAgeyBjbGFzczogXCJtYXNrIG1hc2stc3Rhci0yIGJnLW9yYW5nZS00MDBcIiwgbmFtZTogXCJyYXRpbmctMVwiLCBzdGF0ZTogXCJcIiB9LFxyXG4gICAgeyBjbGFzczogXCJtYXNrIG1hc2stc3Rhci0yIGJnLW9yYW5nZS00MDBcIiwgbmFtZTogXCJyYXRpbmctMVwiLCBzdGF0ZTogXCJjaGVja2VkXCIgfSxcclxuICAgIHsgY2xhc3M6IFwibWFzayBtYXNrLXN0YXItMiBiZy1vcmFuZ2UtNDAwXCIsIG5hbWU6IFwicmF0aW5nLTFcIiwgc3RhdGU6IFwiXCIgfSxcclxuICAgIHsgY2xhc3M6IFwibWFzayBtYXNrLXN0YXItMiBiZy1vcmFuZ2UtNDAwXCIsIG5hbWU6IFwicmF0aW5nLTFcIiwgc3RhdGU6IFwiXCIgfSxcclxuICAgIHsgY2xhc3M6IFwibWFzayBtYXNrLXN0YXItMiBiZy1vcmFuZ2UtNDAwXCIsIG5hbWU6IFwicmF0aW5nLTFcIiwgc3RhdGU6IFwiXCIgfSxcclxuICBdLFxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxjb21wb25lbnRzXFxcXHRvb2x0aXAuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvQ01TL1dvcmRQcmVzcy9PU1AvVml0ZVdQL3dwLWNvbnRlbnQvdGhlbWVzL1ZpdGUtVUktV1Avc3JjL2RhdGEvY29tcG9uZW50cy90b29sdGlwLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRvb2x0aXBOYW1lOiBcIm15X3Rvb2x0aXBcIixcclxuICB0b29sdGlwczogW1xyXG4gICAgeyBjb250ZW50OiBcIlRvb2x0aXAgY29udGVudCAxXCIsIHBvc2l0aW9uOiBcInRvcFwiLCBzdGF0ZTogXCJcIiB9LFxyXG4gICAgeyBjb250ZW50OiBcIlRvb2x0aXAgY29udGVudCAyXCIsIHBvc2l0aW9uOiBcInJpZ2h0XCIsIHN0YXRlOiBcIlwiIH0sXHJcbiAgICB7IGNvbnRlbnQ6IFwiVG9vbHRpcCBjb250ZW50IDNcIiwgcG9zaXRpb246IFwiYm90dG9tXCIsIHN0YXRlOiBcIlwiIH0sXHJcbiAgICB7IGNvbnRlbnQ6IFwiVG9vbHRpcCBjb250ZW50IDRcIiwgcG9zaXRpb246IFwibGVmdFwiLCBzdGF0ZTogXCJcIiB9LFxyXG4gIF0sXHJcbiAgdG9vbHRpcDogeyBjb250ZW50OiBcIlRvb2x0aXAgY29udGVudCAxXCIsIHBvc2l0aW9uOiBcInRvb2x0aXAtcmlnaHRcIiwgc3RhdGU6IFwiXCIgfSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGNvbXBvbmVudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcY29tcG9uZW50c1xcXFxjYXJvdXNlbC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9jb21wb25lbnRzL2Nhcm91c2VsLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNhcm91c2VsTmFtZTogXCJteV9jYXJvdXNlbFwiLFxyXG4gIHNsaWRlczogW1xyXG4gICAgeyBjb250ZW50OiBcIlNsaWRlIDFcIiwgc3RhdGU6IFwiYWN0aXZlXCIgfSxcclxuICAgIHsgY29udGVudDogXCJTbGlkZSAyXCIsIHN0YXRlOiBcIlwiIH0sXHJcbiAgICB7IGNvbnRlbnQ6IFwiU2xpZGUgM1wiLCBzdGF0ZTogXCJcIiB9LFxyXG4gICAgeyBjb250ZW50OiBcIlNsaWRlIDNcIiwgc3RhdGU6IFwiXCIgfSxcclxuICAgIHsgY29udGVudDogXCJTbGlkZSAzXCIsIHN0YXRlOiBcIlwiIH0sXHJcbiAgICB7IGNvbnRlbnQ6IFwiU2xpZGUgM1wiLCBzdGF0ZTogXCJcIiB9LFxyXG4gIF0sXHJcbiAgY3VycmVudFNsaWRlOiAxLFxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxjb21wb25lbnRzXFxcXGNvdW50ZG93bi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9jb21wb25lbnRzL2NvdW50ZG93bi5qc1wiO2V4cG9ydCBkZWZhdWx0IHtcclxuICBjb3VudGRvd25OYW1lOiBcIm15X2NvdW50ZG93blwiLFxyXG4gIHRhcmdldERhdGU6IG5ldyBEYXRlKFwiMjAyNS0xMi0zMVQyMzo1OTo1OVwiKSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGNvbXBvbmVudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcY29tcG9uZW50c1xcXFx0aW1lbGluZS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9jb21wb25lbnRzL3RpbWVsaW5lLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRpbWVsaW5lTmFtZTogXCJteV90aW1lbGluZVwiLFxyXG4gIGV2ZW50czogW1xyXG4gICAge1xyXG4gICAgICBzdGFydDogXCIxOTg0XCIsXHJcbiAgICAgIG1pZGRsZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJoLTUgdy01XCI+XHJcbiAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTAgMThhOCA4IDAgMTAwLTE2IDggOCAwIDAwMCAxNnptMy44NTctOS44MDlhLjc1Ljc1IDAgMDAtMS4yMTQtLjg4MmwtMy40ODMgNC43OS0xLjg4LTEuODhhLjc1Ljc1IDAgMTAtMS4wNiAxLjA2MWwyLjUgMi41YS43NS43NSAwIDAwMS4xMzctLjA4OWw0LTUuNXpcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgLz5cclxuICAgICAgICAgICAgICAgPC9zdmc+YCxcclxuICAgICAgZW5kOiBcIkZpcnN0IE1hY2ludG9zaCBjb21wdXRlclwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzdGFydDogXCIxOTk4XCIsXHJcbiAgICAgIG1pZGRsZTogYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgY2xhc3M9XCJoLTUgdy01XCI+XHJcbiAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTAgMThhOCA4IDAgMTAwLTE2IDggOCAwIDAwMCAxNnptMy44NTctOS44MDlhLjc1Ljc1IDAgMDAtMS4yMTQtLjg4MmwtMy40ODMgNC43OS0xLjg4LTEuODhhLjc1Ljc1IDAgMTAtMS4wNiAxLjA2MWwyLjUgMi41YS43NS43NSAwIDAwMS4xMzctLjA4OWw0LTUuNXpcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgLz5cclxuICAgICAgICAgICAgICAgPC9zdmc+YCxcclxuICAgICAgZW5kOiBcImlNYWNcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc3RhcnQ6IFwiMjAwMVwiLFxyXG4gICAgICBtaWRkbGU6IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGNsYXNzPVwiaC01IHctNVwiPlxyXG4gICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEwIDE4YTggOCAwIDEwMC0xNiA4IDggMCAwMDAgMTZ6bTMuODU3LTkuODA5YS43NS43NSAwIDAwLTEuMjE0LS44ODJsLTMuNDgzIDQuNzktMS44OC0xLjg4YS43NS43NSAwIDEwLTEuMDYgMS4wNjFsMi41IDIuNWEuNzUuNzUgMCAwMDEuMTM3LS4wODlsNC01LjV6XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIC8+XHJcbiAgICAgICAgICAgICAgIDwvc3ZnPmAsXHJcbiAgICAgIGVuZDogXCJpUG9kXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHN0YXJ0OiBcIjIwMDdcIixcclxuICAgICAgbWlkZGxlOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBjbGFzcz1cImgtNSB3LTVcIj5cclxuICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMCAxOGE4IDggMCAxMDAtMTYgOCA4IDAgMDAwIDE2em0zLjg1Ny05LjgwOWEuNzUuNzUgMCAwMC0xLjIxNC0uODgybC0zLjQ4MyA0Ljc5LTEuODgtMS44OGEuNzUuNzUgMCAxMC0xLjA2IDEuMDYxbDIuNSAyLjVhLjc1Ljc1IDAgMDAxLjEzNy0uMDg5bDQtNS41elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiAvPlxyXG4gICAgICAgICAgICAgICA8L3N2Zz5gLFxyXG4gICAgICBlbmQ6IFwiaVBob25lXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHN0YXJ0OiBcIjIwMTVcIixcclxuICAgICAgbWlkZGxlOiBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBjbGFzcz1cImgtNSB3LTVcIj5cclxuICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMCAxOGE4IDggMCAxMDAtMTYgOCA4IDAgMDAwIDE2em0zLjg1Ny05LjgwOWEuNzUuNzUgMCAwMC0xLjIxNC0uODgybC0zLjQ4MyA0Ljc5LTEuODgtMS44OGEuNzUuNzUgMCAxMC0xLjA2IDEuMDYxbDIuNSAyLjVhLjc1Ljc1IDAgMDAxLjEzNy0uMDg5bDQtNS41elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiAvPlxyXG4gICAgICAgICAgICAgICA8L3N2Zz5gLFxyXG4gICAgICBlbmQ6IFwiQXBwbGUgV2F0Y2hcIlxyXG4gICAgfVxyXG4gIF0sXHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxzZWN0aW9uc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxzZWN0aW9uc1xcXFxzZWN0aW9uLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL3NlY3Rpb25zL3NlY3Rpb24uanNcIjtpbXBvcnQgcGFnaW5hdGlvbiBmcm9tICcuLi9jb21wb25lbnRzL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgcmF0aW5nIGZyb20gJy4uL2NvbXBvbmVudHMvcmF0aW5nJztcclxuaW1wb3J0IHRvb2x0aXAgZnJvbSAnLi4vY29tcG9uZW50cy90b29sdGlwJztcclxuaW1wb3J0IGNhcm91c2VsIGZyb20gJy4uL2NvbXBvbmVudHMvY2Fyb3VzZWwnO1xyXG5pbXBvcnQgY291bnRkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRkb3duJztcclxuaW1wb3J0IHRpbWVsaW5lIGZyb20gJy4uL2NvbXBvbmVudHMvdGltZWxpbmUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHBhZ2luYXRpb24sXHJcbiAgcmF0aW5nLFxyXG4gIHRvb2x0aXAsXHJcbiAgY2Fyb3VzZWwsXHJcbiAgY291bnRkb3duLFxyXG4gIHRpbWVsaW5lXHJcbn07IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGRhdGFDb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcZGF0YUNvbmZpZ1xcXFxwYWdlQ29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL2RhdGFDb25maWcvcGFnZUNvbmZpZy5qc1wiO2ltcG9ydCBtb2RhbCBmcm9tIFwiLi4vbGF5b3V0L21vZGFsXCI7XHJcbmltcG9ydCBzZWN0aW9uIGZyb20gXCIuLi9zZWN0aW9ucy9zZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5kZXhQYWdlOiB7XHJcbiAgICBtZXRhOiB7XHJcbiAgICAgIHRpdGxlOiBcIlx1MDQxRFx1MDQzMFx1MDQzN1x1MDQzMlx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDZcdTA0NEJcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiXHUwNDFFXHUwNDNGXHUwNDM4XHUwNDQxXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQ0Mlx1MDQ0MFx1MDQzMFx1MDQzRFx1MDQzOFx1MDQ0Nlx1MDQ0QlwiLFxyXG4gICAgICBmYXZpY29uOiBcIi9maXJlMS5zdmdcIixcclxuICAgICAgb2dJbWFnZTogXCIvYXNzZXRzL2ltZy9vZy1pbWFnZS5qcGdcIixcclxuICAgICAgb2dVcmw6IFwiL1wiLFxyXG4gICAgfSxcclxuICAgIGxheW91dDoge1xyXG4gICAgICBiYXNpYzogdHJ1ZSxcclxuICAgICAgaGVhZGVyOiB0cnVlLFxyXG4gICAgICBmb290ZXI6IHRydWUsXHJcbiAgICAgIGRyYXdlcjogZmFsc2UsXHJcbiAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHNlY3Rpb25zOiB7XHJcbiAgICAgIHNlY3Rpb246IGZhbHNlLFxyXG4gICAgICBoZXJvOiB0cnVlLFxyXG4gICAgICBjYXJkczogdHJ1ZSxcclxuICAgICAgYWJvdXQ6IGZhbHNlLFxyXG4gICAgICBzbGlkZXI6IHRydWUsXHJcbiAgICAgIHByaWNlOiB0cnVlLFxyXG4gICAgICBmb3JtOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGFib3V0UGFnZToge1xyXG4gICAgbWV0YToge1xyXG4gICAgICB0aXRsZTogXCJcdTA0MURcdTA0MzBcdTA0MzdcdTA0MzJcdTA0MzBcdTA0M0RcdTA0MzhcdTA0MzUgXHUwNDQxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDNEXHUwNDM4XHUwNDQ2XHUwNDRCXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlx1MDQxRVx1MDQzRlx1MDQzOFx1MDQ0MVx1MDQzMFx1MDQzRFx1MDQzOFx1MDQzNSBcdTA0NDFcdTA0NDJcdTA0NDBcdTA0MzBcdTA0M0RcdTA0MzhcdTA0NDZcdTA0NEJcIixcclxuICAgICAgZmF2aWNvbjogXCIvZmlyZTEuc3ZnXCIsXHJcbiAgICAgIG9nSW1hZ2U6IFwiL2Fzc2V0cy9pbWcvb2ctaW1hZ2UuanBnXCIsXHJcbiAgICAgIG9nVXJsOiBcIi9cIixcclxuICAgIH0sXHJcbiAgICBsYXlvdXQ6IHtcclxuICAgICAgZHJhd2VyOiBmYWxzZSxcclxuICAgICAgaGVhZGVyOiBmYWxzZSxcclxuICAgICAgZm9vdGVyOiBmYWxzZSxcclxuICAgICAgYmFzaWM6IHRydWUsXHJcbiAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHNlY3Rpb25zOiB7XHJcbiAgICAgIGhlcm86IHRydWUsXHJcbiAgICAgIGNhcmRzOiB0cnVlLFxyXG4gICAgICBhYm91dDogdHJ1ZSxcclxuICAgICAgc2xpZGVyOiB0cnVlLFxyXG4gICAgICBwcmljZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXFxcXGFib3V0LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL3NlY3Rpb25zL2Fib3V0LmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRlbXBsYXRlOiBcImFib3V0XCIsXHJcbiAgY2xhc3M6IFwiYWJvdXRcIixcclxuICB0aXRsZTogXCJXZSBhcmUgdGhlIGNoYW1waW9uc1wiLFxyXG4gIGRlc2NyaXB0aW9uOiBcIkFyb3VuZCB0aGUgd29ybGRcIixcclxuICBjYXJkQkltZzogeyBhbHQ6IFwiQ2FyZCBpbWFnZVwiLCBjbGFzczogXCJyb3VuZGVkLWxnXCIsIHBhdGg6IFwiL2Fzc2V0cy9pbWcvd2F0ZXJmYWxsLnBuZ1wiIH0sXHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxhc3NldHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcYXNzZXRzXFxcXEhicy1oZWxwZXJzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL2Fzc2V0cy9IYnMtaGVscGVycy5qc1wiOy8vIGhhbmRsZWJhcnMtaGVscGVycy5qc1xyXG5pbXBvcnQgSGFuZGxlYmFycyBmcm9tIFwiaGFuZGxlYmFyc1wiO1xyXG5cclxuLy8gXHUwNDIwXHUwNDM1XHUwNDMzXHUwNDM4XHUwNDQxXHUwNDQyXHUwNDQwXHUwNDM4XHUwNDQwXHUwNDQzXHUwNDM1XHUwNDNDIFx1MDQzQVx1MDQzMFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQzQ1x1MDQzRFx1MDQ0Qlx1MDQzOSBcdTA0NDVcdTA0MzVcdTA0M0JcdTA0M0ZcdTA0MzVcdTA0NDBcclxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcihcInRpbWVzXCIsIGZ1bmN0aW9uIChuLCBibG9jaykge1xyXG4gIGxldCByZXN1bHQgPSBcIlwiO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICByZXN1bHQgKz0gYmxvY2suZm4oeyBpbmRleDogaSB9KTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufSk7XHJcblxyXG4vLyBcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAsIFx1MDQ0Rlx1MDQzMlx1MDQzQlx1MDQ0Rlx1MDQzNVx1MDQ0Mlx1MDQ0MVx1MDQ0RiBcdTA0M0JcdTA0MzggXHUwNDM3XHUwNDNEXHUwNDMwXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzQ1x1MDQzMFx1MDQ0MVx1MDQ0MVx1MDQzOFx1MDQzMlx1MDQzRVx1MDQzQ1xyXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdpc0FycmF5JywgZnVuY3Rpb24gKHZhbHVlLCBvcHRpb25zKSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTsgLy8gXHUwNDEyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDRGXHUwNDM1XHUwNDNDIFx1MDQzMVx1MDQzQlx1MDQzRVx1MDQzQSB7eyNpc0FycmF5fX1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTsgLy8gXHUwNDEyXHUwNDRCXHUwNDNGXHUwNDNFXHUwNDNCXHUwNDNEXHUwNDRGXHUwNDM1XHUwNDNDIFx1MDQzMVx1MDQzQlx1MDQzRVx1MDQzQSB7e2Vsc2V9fVxyXG4gIH1cclxufSk7XHJcblxyXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdlcScsIGZ1bmN0aW9uKGEsIGIpIHtcclxuICByZXR1cm4gYSA9PT0gYjtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDYXJkcyhjb3VudCkge1xyXG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBjb3VudCB9LCAoXywgaSkgPT4gKHtcclxuICAgIHRpdGxlOiBgQ2FyZCAke2kgKyAxfWAsXHJcbiAgICBkZXNjOiBgRGVzY3JpcHRpb24gZm9yIGNhcmQgJHtpICsgMX1gLFxyXG4gICAgaW1nOiBgL1BsYWNlaG9sZGVyLnBuZ2AsXHJcbiAgICBidG46IGBEb24ndCBwcmVzcyBpdCFgXHJcbiAgfSkpO1xyXG59XHJcblxyXG4vLyBleHBvcnQgY29uc3QgY2FyZHMgPSBnZW5lcmF0ZUNhcmRzKDEwKTsgLy8gXHUwNDEzXHUwNDM1XHUwNDNEXHUwNDM1XHUwNDQwXHUwNDMwXHUwNDQ2XHUwNDM4XHUwNDRGIDEwIFx1MDQzQVx1MDQzMFx1MDQ0MFx1MDQ0Mlx1MDQzRVx1MDQ0N1x1MDQzNVx1MDQzQSAtIFx1MDQ0Mlx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQzMlx1MDQ0Qlx1MDQzNSBcdTA0MzRcdTA0MzBcdTA0M0RcdTA0M0RcdTA0NEJcdTA0MzUgXHUwNDM0XHUwNDNCXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzOCBcdTA0M0RcdTA0MzBcdTA0M0ZcdTA0M0VcdTA0M0JcdTA0M0RcdTA0MzVcdTA0M0RcdTA0MzhcdTA0NEYgXHUwNDNBXHUwNDNFXHUwNDNDXHUwNDNGXHUwNDNFXHUwNDNEXHUwNDM1XHUwNDNEXHUwNDQyXHUwNDNFXHUwNDMyIFx1MDQzQVx1MDQzRVx1MDQzRFx1MDQ0Mlx1MDQzNVx1MDQzRFx1MDQ0Mlx1MDQzRVx1MDQzQ1xyXG5cclxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcihcImluY3JlbWVudGVkSW5kZXhcIiwgZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgcmV0dXJuIGluZGV4ICsgMTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIYW5kbGViYXJzO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcc2VjdGlvbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcc2VjdGlvbnNcXFxcY2FyZHMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvQ01TL1dvcmRQcmVzcy9PU1AvVml0ZVdQL3dwLWNvbnRlbnQvdGhlbWVzL1ZpdGUtVUktV1Avc3JjL2RhdGEvc2VjdGlvbnMvY2FyZHMuanNcIjtpbXBvcnQgeyBnZW5lcmF0ZUNhcmRzIH0gZnJvbSBcIi4uLy4uLy4uL2Fzc2V0cy9IYnMtaGVscGVyc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRlbXBsYXRlOiBcImNhcmRzXCIsXHJcbiAgZ2VuZXJhdGU6IGZhbHNlLCAvL2dlbmVyYXRlQ2FyZHMoNiksXHJcbiAgd3JhcHBlckNsYXNzOiBcImNhcmRzIGdyaWQgZ2FwLTEyIG1kOmdyaWQtY29scy0yIHhsOmdyaWQtY29scy0zIG1kOml0ZW1zLWNlbnRlclwiLFxyXG4gIGhlYWRpbmc6IHtcclxuICAgIGNvbnRhaW5lcjogdHJ1ZSxcclxuICAgIHRpdGxlTGV2ZWw6IFwiMlwiLFxyXG4gICAgdGl0bGU6IFwiXHUwNDI3XHUwNDQyXHUwNDNFIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Rlx1MDQzNVx1MDQzQ1wiLFxyXG4gICAgZGVzY3JpcHRpb246IGZhbHNlLFxyXG4gICAgY2xhc3M6IHtcclxuICAgICAgY29udGFpbmVyOiBcIlwiLFxyXG4gICAgICB0aXRsZTogXCJtYi0xMlwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJtYi0xMiBmb250LXNhbnMgbGc6dGV4dC0yeGwgZm9udC1ub3JtYWwgbWF4LXctbGcgeGw6bWF4LXctM3hsXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY2FyZHM6IFtcclxuICAgIHtcclxuICAgICAgY2FyZENsYXNzOiBcImJnLWJhc2UtMzAwIG1kOnctOTZcIixcclxuICAgICAgY2FyZEhlYWRpbmc6IHtcclxuICAgICAgICB0aXRsZTogXCJcdTA0MURcdTA0MzVcdTA0MzRcdTA0MzJcdTA0MzhcdTA0MzZcdTA0MzhcdTA0M0NcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzhcIixcclxuICAgICAgICBkZXNjcmlwdGlvbjogZmFsc2UsXHJcbiAgICAgICAgY2xhc3M6IHtcclxuICAgICAgICAgIGNsYXNzVGl0bGU6IFwiY2FyZC10aXRsZSB0ZXh0LXNtIG1kOnRleHQtbGcgbGc6dGV4dC0yeGwgdy1mdWxsXCIsXHJcbiAgICAgICAgICBjbGFzc0Rlc2M6IFwiXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgY2FyZEltZzoge1xyXG4gICAgICAgIGFsdDogXCJob3VzZSBoaXN0b3J5XCIsXHJcbiAgICAgICAgY2xhc3M6IFwicm91bmRlZC1sZyBwLTZcIixcclxuICAgICAgICBwYXRoOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvbGlzdC1jYXJkcy1iZy9ob3VzZS5qcGdcIixcclxuICAgICAgICAvLyB3OiBcIjY0MFwiLFxyXG4gICAgICAgIC8vIGg6IFwiNjQwXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhcmRQaWN0dXJlOiB0cnVlLFxyXG4gICAgICBjYXJkQWN0aW9uczogZmFsc2UsXHJcbiAgICAgIGNhcmRCdG46IFwiQ2FyZEIgMSBCdXkgbm93IVwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgY2FyZENsYXNzOiBcImJnLWJhc2UtMzAwIG1kOnctOTZcIixcclxuICAgICAgY2FyZEhlYWRpbmc6IHtcclxuICAgICAgICB0aXRsZTogXCJcdTA0MUZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0NEZcdTA0MzVcdTA0M0MgXHUwNDNFXHUwNDMxXHUwNDRBXHUwNDM1XHUwNDNBXHUwNDQyIFx1MDQzRFx1MDQzNVx1MDQzNFx1MDQzMlx1MDQzOFx1MDQzNlx1MDQzOFx1MDQzQ1x1MDQzRVx1MDQ0MVx1MDQ0Mlx1MDQzOFwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBmYWxzZSxcclxuICAgICAgICBjbGFzczoge1xyXG4gICAgICAgICAgY2xhc3NUaXRsZTogXCJjYXJkLXRpdGxlIHRleHQtc20gbWQ6dGV4dC1sZyBsZzp0ZXh0LTJ4bCB3LWZ1bGxcIixcclxuICAgICAgICAgIGNsYXNzRGVzYzogXCJcIixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBjYXJkSW1nOiB7XHJcbiAgICAgICAgYWx0OiBcImhvdXNlIGhpc3RvcnlcIixcclxuICAgICAgICBjbGFzczogXCJyb3VuZGVkLWxnIHAtNlwiLFxyXG4gICAgICAgIHBhdGg6IFwiL2Fzc2V0cy9pbWcvY29tcHJlc3NlZC9saXN0LWNhcmRzLWJnL2hvdXNlLmpwZ1wiLFxyXG4gICAgICAgIC8vIHc6IFwiNjQwXCIsXHJcbiAgICAgICAgLy8gaDogXCI2NDBcIixcclxuICAgICAgfSxcclxuICAgICAgY2FyZFBpY3R1cmU6IHRydWUsXHJcbiAgICAgIGNhcmRBY3Rpb25zOiBmYWxzZSxcclxuICAgICAgY2FyZEJ0bjogXCJDYXJkQiAxIEJ1eSBub3chXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBjYXJkQ2xhc3M6IFwiYmctYmFzZS0zMDAgbWQ6dy05NlwiLFxyXG4gICAgICBjYXJkSGVhZGluZzoge1xyXG4gICAgICAgIHRpdGxlOiBcIlx1MDQxRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQ0Rlx1MDQzNVx1MDQzQyBcdTA0MzhcdTA0NDFcdTA0NDJcdTA0M0VcdTA0NDBcdTA0MzhcdTA0NEUgXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDMyXHUwNDM4XHUwNDM2XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4XCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGZhbHNlLFxyXG4gICAgICAgIGNsYXNzOiB7XHJcbiAgICAgICAgICBjbGFzc1RpdGxlOiBcImNhcmQtdGl0bGUgdGV4dC1zbSBtZDp0ZXh0LWxnIGxnOnRleHQtMnhsIHctZnVsbFwiLFxyXG4gICAgICAgICAgY2xhc3NEZXNjOiBcIlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhcmRJbWc6IHtcclxuICAgICAgICBhbHQ6IFwiaG91c2UgaGlzdG9yeVwiLFxyXG4gICAgICAgIGNsYXNzOiBcInJvdW5kZWQtbGcgcC02XCIsXHJcbiAgICAgICAgcGF0aDogXCIvYXNzZXRzL2ltZy9jb21wcmVzc2VkL2xpc3QtY2FyZHMtYmcvaG91c2UuanBnXCIsXHJcbiAgICAgICAgLy8gdzogXCI2NDBcIixcclxuICAgICAgICAvLyBoOiBcIjY0MFwiLFxyXG4gICAgICB9LFxyXG4gICAgICBjYXJkUGljdHVyZTogdHJ1ZSxcclxuICAgICAgY2FyZEFjdGlvbnM6IGZhbHNlLFxyXG4gICAgICBjYXJkQnRuOiBcIkNhcmRCIDEgQnV5IG5vdyFcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGNhcmRDbGFzczogXCJiZy1iYXNlLTMwMCBtZDp3LTk2XCIsXHJcbiAgICAgIGNhcmRIZWFkaW5nOiB7XHJcbiAgICAgICAgdGl0bGU6IFwiXHUwNDFGXHUwNDQwXHUwNDNFXHUwNDMyXHUwNDM1XHUwNDQwXHUwNDRGXHUwNDM1XHUwNDNDIFx1MDQzOFx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzOFx1MDQ0RSBcdTA0M0VcdTA0MzFcdTA0NEFcdTA0MzVcdTA0M0FcdTA0NDJcdTA0MzAgXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDMyXHUwNDM4XHUwNDM2XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4XCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGZhbHNlLFxyXG4gICAgICAgIGNsYXNzOiB7XHJcbiAgICAgICAgICBjbGFzc1RpdGxlOiBcImNhcmQtdGl0bGUgdGV4dC1zbSBtZDp0ZXh0LWxnIGxnOnRleHQtMnhsIHctZnVsbFwiLFxyXG4gICAgICAgICAgY2xhc3NEZXNjOiBcIlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhcmRJbWc6IHtcclxuICAgICAgICBhbHQ6IFwiaG91c2UgaGlzdG9yeVwiLFxyXG4gICAgICAgIGNsYXNzOiBcInJvdW5kZWQtbGcgcC02XCIsXHJcbiAgICAgICAgcGF0aDogXCIvYXNzZXRzL2ltZy9jb21wcmVzc2VkL2xpc3QtY2FyZHMtYmcvaG91c2UuanBnXCIsXHJcbiAgICAgICAgLy8gdzogXCI2NDBcIixcclxuICAgICAgICAvLyBoOiBcIjY0MFwiLFxyXG4gICAgICB9LFxyXG4gICAgICBjYXJkUGljdHVyZTogdHJ1ZSxcclxuICAgICAgY2FyZEFjdGlvbnM6IGZhbHNlLFxyXG4gICAgICBjYXJkQnRuOiBcIkNhcmRCIDEgQnV5IG5vdyFcIixcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXFxcXGhlcm8uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvQ01TL1dvcmRQcmVzcy9PU1AvVml0ZVdQL3dwLWNvbnRlbnQvdGhlbWVzL1ZpdGUtVUktV1Avc3JjL2RhdGEvc2VjdGlvbnMvaGVyby5qc1wiO2V4cG9ydCBkZWZhdWx0IHtcclxuICB0ZW1wbGF0ZTogXCJoZXJvXCIsXHJcbiAgY2xhc3M6IFwiaGVybyBtaW4taC1bNzY4cHhdIHBsYWNlLWNvbnRlbnQtc3RhcnQgbWF4LXctc2NyZWVuLTJ4bCBtZDp0cmFuc2xhdGUteS0yNFwiLFxyXG4gIGNsYXNzQ29udGVudDogXCJoZXJvLWNvbnRlbnQganVzdGlmeS1zdGFydCBmbGV4LWNvbCBtZDpmbGV4LXJvdyB0ZXh0LWNlbnRlciBtZDp0ZXh0LWxlZnQgeGw6bWF4LXctNHhsIHctZnVsbFwiLFxyXG4gIGhlYWRpbmc6IHtcclxuICAgIHRpdGxlTGV2ZWw6IFwiMVwiLFxyXG4gICAgdGl0bGU6IFwiXHUwNDJFXHUwNDQwXHUwNDM4XHUwNDM0XHUwNDM4XHUwNDQ3XHUwNDM1XHUwNDQxXHUwNDNBXHUwNDMwXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMCBcdTA0M0VcdTA0MzFcdTA0NEFcdTA0MzVcdTA0M0FcdTA0NDJcdTA0MzAgXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDMyXHUwNDM4XHUwNDM2XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4IFx1MDQzRlx1MDQzNVx1MDQ0MFx1MDQzNVx1MDQzNCBcdTA0M0ZcdTA0M0VcdTA0M0FcdTA0NDNcdTA0M0ZcdTA0M0FcdTA0M0VcdTA0MzlcIixcclxuICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICBcIlx1MDQxMlx1MDQ0MVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQzRVx1MDQ0MFx1MDQzRVx1MDQzRFx1MDQzRFx1MDQ0Rlx1MDQ0RiBcdTA0M0ZcdTA0NDBcdTA0M0VcdTA0MzJcdTA0MzVcdTA0NDBcdTA0M0FcdTA0MzAgXHUwNDM4XHUwNDQxXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDM4XHUwNDM4IFx1MDQzRVx1MDQzMVx1MDQ0QVx1MDQzNVx1MDQzQVx1MDQ0Mlx1MDQzMCBcdTA0M0RcdTA0MzVcdTA0MzRcdTA0MzJcdTA0MzhcdTA0MzZcdTA0MzhcdTA0M0NcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzgsIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzNFx1MDQzMFx1MDQzMlx1MDQ0Nlx1MDQzMCwgXHUwNDNGXHUwNDQwXHUwNDMwXHUwNDMyIDMtXHUwNDNCXHUwNDM4XHUwNDQ2IFx1MDQzOCBcdTA0NDVcdTA0MzBcdTA0NDBcdTA0MzBcdTA0M0FcdTA0NDJcdTA0MzVcdTA0NDBcdTA0MzhcdTA0NDFcdTA0NDJcdTA0MzhcdTA0M0EgXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDMyXHUwNDM4XHUwNDM2XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4XCIsXHJcbiAgICBjbGFzczoge1xyXG4gICAgICBjb250YWluZXJDbGFzczogXCJcIixcclxuICAgICAgdGl0bGU6IFwibWItMTIgdGV4dC0zeGwgbGc6dGV4dC00eGwgeGw6dGV4dC02eGxcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwibWItMTIgZm9udC1zYW5zIGxnOnRleHQtMnhsIGZvbnQtbm9ybWFsIG1heC13LWxnIHhsOm1heC13LTN4bFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1dHRvbjogeyBidG5DbGFzczogXCJidG4gYnRuLXByaW1hcnkgdGV4dC1iYXNlLTEwMCB3LTUyXCIsIHRleHQ6IFwiXHUwNDFFXHUwNDQxXHUwNDQyXHUwNDMwXHUwNDMyXHUwNDM4XHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMFx1MDQ0Rlx1MDQzMlx1MDQzQVx1MDQ0M1wiIH0sXHJcbiAgaGVyb0NhcmRzOiBbXHJcbiAgICB7XHJcbiAgICAgIGNsYXNzOiBcInctMzIgaC0yMCBweC04IHB0LThcIixcclxuICAgICAgcGF0aDogXCIvYXNzZXRzL2ljb25zL2hlcm8taWNvbnMvc2hpZWxkLnN2Z1wiLFxyXG4gICAgICB0aXRsZTogXCJcdTA0MTFcdTA0MzVcdTA0MzdcdTA0M0VcdTA0M0ZcdTA0MzBcdTA0NDFcdTA0M0RcdTA0M0VcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiXHUwNDEyXHUwNDQxXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDNFXHUwNDQwXHUwNDNFXHUwNDNEXHUwNDNEXHUwNDRGXHUwNDRGIFx1MDQzRlx1MDQ0MFx1MDQzRVx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzQVx1MDQzMFx1MDBBMFx1MDQzRlx1MDQzRSBcdTA0MzFcdTA0MzBcdTA0MzdcdTA0MzBcdTA0M0MgXHUwNDM4IFx1MDQ0MFx1MDQzNVx1MDQzNVx1MDQ0MVx1MDQ0Mlx1MDQ0MG9cdTA0M0NcIixcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXFxcXHByaWNlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL3NlY3Rpb25zL3ByaWNlLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRlbXBsYXRlOiBcInByaWNlXCIsXHJcbiAgY2xhc3M6IFwicHJpY2UgY29udGFpbmVyIG14LWF1dG8gbWItMTYgYmctYmFzZS0yMDAgcm91bmRlZC14bFwiLFxyXG4gIGhlYWRpbmc6IHtcclxuICAgIGNvbnRhaW5lcjogZmFsc2UsXHJcbiAgICB0aXRsZUxldmVsOiAzLFxyXG4gICAgdGl0bGU6IFwicHJpY2VcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImRlc2NcIixcclxuICAgIGNsYXNzOiB7IGNvbnRhaW5lckNsYXNzOiBcIlwiLCB0aXRsZTogXCJcIiwgZGVzY3JpcHRpb246IFwiXCIgfSxcclxuICB9LFxyXG4gIGNvbnRlbnQ6IHtcclxuICAgIGNsYXNzOiBcImdhcC04IGdyaWQgbGc6Z3JpZC1jb2xzLTIgcGxhY2UtaXRlbXMtY2VudGVyIGgtYXV0b1wiLFxyXG4gICAgY29sMTogXCJncmlkIGdhcC04IHB5LTRcIixcclxuICAgIGNvbDI6IFwiYmctYmFzZS0xMDAgcm91bmRlZC10LWZ1bGxcIixcclxuICB9LFxyXG4gIGJ1dHRvbnM6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTA0MjZcdTA0MzVcdTA0M0RcdTA0MzA6IDE1IDAwMCBcdTA0NDBcdTA0NDNcdTA0MzFcdTA0M0JcdTA0MzVcdTA0MzlcIixcclxuICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1vdXRsaW5lIGJ0bi1hY2NlbnQgYnRuLXdpZGUgYmctYmFzZS0xMDAgaG92ZXI6YmctYWNjZW50IGhvdmVyOmJvcmRlci1hY2NlbnRcIixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHUwNDEyXHUwNDNDXHUwNDM1XHUwNDQxXHUwNDQyXHUwNDNFIDMzIDAwMCBcdTA0NDBcdTA0NDNcdTA0MzFcdTA0M0JcdTA0MzVcdTA0MzlcIixcclxuICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1kaXNhYmxlZCBidG4td2lkZSAhYmctYmFzZS0xMDAgIWJnLW9wYWNpdHktNjAgIXRleHQtb3BhY2l0eS01MCByZWxhdGl2ZSBjcm9zcy1vdXRcIixcclxuICAgIH0sXHJcbiAgICB7IHRleHQ6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDMwXHUwNDM3XHUwNDMwXHUwNDQyXHUwNDRDXCIsIGNsYXNzOiBcImJ0biBidG4tYWNjZW50IGJ0bi13aWRlXCIgfSxcclxuICBdLFxyXG4gIGltZzoge1xyXG4gICAgYWx0OiAnc2FsZScsXHJcbiAgICBtb2Rlcm46IFwiL2Fzc2V0cy9pbWcvY29tcHJlc3NlZC9zYWxlLWltZy53ZWJwXCIsXHJcbiAgICBwYXRoOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvc2FsZS1pbWcucG5nXCIsXHJcbiAgICBjbGFzczogXCJiZy1iYXNlLTEwMCByb3VuZGVkLXQtZnVsbFwiLFxyXG4gIH0sXHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxzZWN0aW9uc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxzZWN0aW9uc1xcXFxzbGlkZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvQ01TL1dvcmRQcmVzcy9PU1AvVml0ZVdQL3dwLWNvbnRlbnQvdGhlbWVzL1ZpdGUtVUktV1Avc3JjL2RhdGEvc2VjdGlvbnMvc2xpZGVyLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRlbXBsYXRlOiBcInNsaWRlclwiLFxyXG4gIGNsYXNzOiBcInNsaWRlciBjb250YWluZXIgbXgtYXV0byBtYi0xNlwiLFxyXG4gIGhlYWRpbmc6IHtcclxuICAgIGNvbnRhaW5lcjogdHJ1ZSxcclxuICAgIHRpdGxlTGV2ZWw6IFwiM1wiLFxyXG4gICAgdGl0bGU6IFwic2xpZGVyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogZmFsc2UsXHJcbiAgICBjbGFzczoge1xyXG4gICAgICBjb250YWluZXJDbGFzczogXCJzbGlkZXJcIixcclxuICAgICAgdGl0bGU6IFwibWItMTJcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwibWItMTIgZm9udC1zYW5zIGxnOnRleHQtMnhsIGZvbnQtbm9ybWFsIG1heC13LWxnIHhsOm1heC13LTN4bFwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNsaWRlckNvbW1vbjoge1xyXG4gICAgLy8gY29tbW9uIGRhdGEgZm9yIHNsaWRlciBjYXJkc1xyXG4gICAgY3VzdG9tQ29udHJvbDogeyBjb250cm9sOiB0cnVlLCBjb250cm9sQ2xhc3M6IFwiXCIsIGNvbnRyb2xJY29uOiBcImFycm93XCIsIGljb25DbGFzczogXCJ0ZXh0LWJhc2UtMTAwXCIgfSxcclxuICAgIHBhZ2luYXRpb246IHt9LFxyXG4gICAgaWNvbjogXCJwbGF5XCIsXHJcbiAgfSxcclxuICBzbGlkZXM6IHtcclxuICAgIC8vIGluZGl2aWR1YWwgZGF0YSBmb3Igc2xpZGVyIGNhcmRzXHJcbiAgICBzbGlkZURhdGE6IFtcclxuICAgICAge1xyXG4gICAgICAgIGNhcmRCSW1nOiB7XHJcbiAgICAgICAgICB0aXRsZTogXCJDYXJkIDEgaW1hZ2VcIixcclxuICAgICAgICAgIGNsYXNzOiBcInJvdW5kZWQteGxcIixcclxuICAgICAgICAgIG1vZGVybjogXCIvYXNzZXRzL2ltZy9jb21wcmVzc2VkL3ZpZGVvLXByZXZpZXcvVmlkZW9fMS53ZWJwXCIsXHJcbiAgICAgICAgICBwYXRoOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvdmlkZW8tcHJldmlldy9WaWRlb18xLmpwZ1wiLFxyXG4gICAgICAgICAgdzogXCI3ODZcIixcclxuICAgICAgICAgIGg6IFwiNDUyXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJkQm9keTogZmFsc2UsXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vIGNhcmRCVGl0bGU6IFwiXCIsXHJcbiAgICAgICAgLy8gY2FyZEJEZXNjOiBcIlwiLFxyXG4gICAgICAgIC8vIGNhcmRCQnRuOiBmYWxzZSxcclxuICAgICAgICAvLyB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY2FyZEJJbWc6IHtcclxuICAgICAgICAgIHRpdGxlOiBcIkNhcmQgMiBpbWFnZVwiLFxyXG4gICAgICAgICAgY2xhc3M6IFwicm91bmRlZC14bFwiLFxyXG4gICAgICAgICAgbW9kZXJuOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvdmlkZW8tcHJldmlldy9WaWRlb18yLndlYnBcIixcclxuICAgICAgICAgIHBhdGg6IFwiL2Fzc2V0cy9pbWcvY29tcHJlc3NlZC92aWRlby1wcmV2aWV3L1ZpZGVvXzIuanBnXCIsXHJcbiAgICAgICAgICB3OiBcIjc4NlwiLFxyXG4gICAgICAgICAgaDogXCI0NTJcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcmRCb2R5OiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGNhcmRCSW1nOiB7XHJcbiAgICAgICAgICB0aXRsZTogXCJDYXJkIDIgaW1hZ2VcIixcclxuICAgICAgICAgIGNsYXNzOiBcInJvdW5kZWQteGxcIixcclxuICAgICAgICAgIG1vZGVybjogXCIvYXNzZXRzL2ltZy9jb21wcmVzc2VkL3ZpZGVvLXByZXZpZXcvVmlkZW9fMi53ZWJwXCIsXHJcbiAgICAgICAgICBwYXRoOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvdmlkZW8tcHJldmlldy9WaWRlb18xLmpwZ1wiLFxyXG4gICAgICAgICAgdzogXCI3ODZcIixcclxuICAgICAgICAgIGg6IFwiNDUyXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJkQm9keTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBjYXJkQkltZzoge1xyXG4gICAgICAgICAgdGl0bGU6IFwiQ2FyZCAyIGltYWdlXCIsXHJcbiAgICAgICAgICBjbGFzczogXCJyb3VuZGVkLXhsXCIsXHJcbiAgICAgICAgICBtb2Rlcm46IFwiL2Fzc2V0cy9pbWcvY29tcHJlc3NlZC92aWRlby1wcmV2aWV3L1ZpZGVvXzEud2VicFwiLFxyXG4gICAgICAgICAgcGF0aDogXCIvYXNzZXRzL2ltZy9jb21wcmVzc2VkL3ZpZGVvLXByZXZpZXcvVmlkZW9fMi5qcGdcIixcclxuICAgICAgICAgIHc6IFwiNzg2XCIsXHJcbiAgICAgICAgICBoOiBcIjQ1MlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FyZEJvZHk6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgY2FyZEJJbWc6IHtcclxuICAgICAgICAgIHRpdGxlOiBcIkNhcmQgMiBpbWFnZVwiLFxyXG4gICAgICAgICAgY2xhc3M6IFwicm91bmRlZC14bFwiLFxyXG4gICAgICAgICAgbW9kZXJuOiBcIi9hc3NldHMvaW1nL2NvbXByZXNzZWQvdmlkZW8tcHJldmlldy9WaWRlb18yLndlYnBcIixcclxuICAgICAgICAgIHBhdGg6IFwiL2Fzc2V0cy9pbWcvY29tcHJlc3NlZC92aWRlby1wcmV2aWV3L1ZpZGVvXzEuanBnXCIsXHJcbiAgICAgICAgICB3OiBcIjc4NlwiLFxyXG4gICAgICAgICAgaDogXCI0NTJcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcmRCb2R5OiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHNlY3Rpb25zXFxcXGZvcm0uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvQ01TL1dvcmRQcmVzcy9PU1AvVml0ZVdQL3dwLWNvbnRlbnQvdGhlbWVzL1ZpdGUtVUktV1Avc3JjL2RhdGEvc2VjdGlvbnMvZm9ybS5qc1wiO2V4cG9ydCBkZWZhdWx0IHtcclxuICB0ZW1wbGF0ZTogXCJmb3JtXCIsXHJcbiAgaGVhZGluZzoge1xyXG4gICAgY29udGFpbmVyOiB0cnVlLFxyXG4gICAgdGl0bGVMZXZlbDogXCIyXCIsXHJcbiAgICB0aXRsZTogXCJcdTA0MjFcdTA0MzVcdTA0M0FcdTA0NDZcdTA0MzhcdTA0NEYgXHUwNDQ0XHUwNDNFXHUwNDQwXHUwNDNDXHUwNDRCXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogZmFsc2UsXHJcbiAgICBjbGFzczoge1xyXG4gICAgICBjb250YWluZXI6IFwiXCIsXHJcbiAgICAgIHRpdGxlOiBcIm1iLTEyXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBcIm1iLTEyIGZvbnQtc2FucyBsZzp0ZXh0LTJ4bCBmb250LW5vcm1hbCBtYXgtdy1sZyB4bDptYXgtdy0zeGxcIixcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGRhdGFDb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcZGF0YUNvbmZpZ1xcXFxzZWN0aW9ucy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9kYXRhQ29uZmlnL3NlY3Rpb25zLmpzXCI7aW1wb3J0IHNlY3Rpb24gZnJvbSBcIi4uL3NlY3Rpb25zL3NlY3Rpb25cIjtcclxuaW1wb3J0IGFib3V0IGZyb20gXCIuLi9zZWN0aW9ucy9hYm91dFwiO1xyXG5pbXBvcnQgY2FyZHMgZnJvbSBcIi4uL3NlY3Rpb25zL2NhcmRzXCI7XHJcbmltcG9ydCBoZXJvIGZyb20gXCIuLi9zZWN0aW9ucy9oZXJvXCI7XHJcbmltcG9ydCBwcmljZSBmcm9tIFwiLi4vc2VjdGlvbnMvcHJpY2VcIjtcclxuaW1wb3J0IHNsaWRlciBmcm9tIFwiLi4vc2VjdGlvbnMvc2xpZGVyXCI7XHJcbmltcG9ydCBmb3JtIGZyb20gXCIuLi9zZWN0aW9ucy9mb3JtXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdHtcclxuICBhYm91dCwgY2FyZHMsIGhlcm8sIHByaWNlLCBzbGlkZXIsIHNlY3Rpb24sIGZvcm1cclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxjb21wb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGNvbXBvbmVudHNcXFxcbWVudS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9jb21wb25lbnRzL21lbnUuanNcIjtleHBvcnQgZGVmYXVsdCB7XHJcbiAgbWVudUNsYXNzOiBcIm1lbnUgbWVudS1ob3Jpem9udGFsIHB4LTEgaGlkZGVuIGxnOmZsZXggdGV4dC1iYXNlLTEwMFwiLFxyXG4gIG1lbnVTbUNsYXNzOiBcIm1lbnUgbWVudS1zbSBkcm9wZG93bi1jb250ZW50IGJnLWJhc2UtMTAwIHJvdW5kZWQtYm94IHotWzFdIG10LTMgdy01MiBwLTIgc2hhZG93XCIsXHJcbiAgaXRlbXM6IHsgYmVmb3JlOiBbXCJIb21lXCIsIFwiQWJvdXRcIl0sIGFmdGVyOiBbXCJDb250YWN0c1wiLCBcIlByaWNlc1wiXSB9LFxyXG4gIHN1Yjoge1xyXG4gICAgc3ViSGVhZGluZzogXCJWZWhpY2xlc1wiLFxyXG4gICAgbWVudUNsYXNzOiBcInAtMiBiZy1iYXNlLTIwMCB3LTM2IHotMTAgdGV4dC1wcmltYXJ5LWNvbnRlbnRcIixcclxuICAgIG1lbnVTbUNsYXNzOiBcInAtMiBiZy1iYXNlLTEwMCB3LTM2IHotMTBcIixcclxuICAgIGxpc3RJdGVtczogW1wiQ2hldnJvbGV0XCIsIFwibXkgQ2FyXCIsIFwiWW91ciBDYXJcIl0sXHJcbiAgfSxcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGxheW91dFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxsYXlvdXRcXFxcaGVhZGVyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL2xheW91dC9oZWFkZXIuanNcIjtpbXBvcnQgbWVudSBmcm9tICcuLi9jb21wb25lbnRzL21lbnUnO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbmF2YmFyOiB7XHJcbiAgICBoZWFkZXJDbGFzczogXCIgYmctaW5mb1wiLFxyXG4gICAgY29udGFpbmVyQ2xhc3M6IFwiIG14LWF1dG8gcHktNlwiLFxyXG4gICAgbmF2YmFyQ2xhc3M6IFwiIGJnLXRyYW5zcGFyZW50IGp1c3RpZnktYmV0d2VlblwiLFxyXG4gICAgbmF2YmFyU3RhcnQ6IFwiIHctMS82IGxnOnctMS8zXCIsXHJcbiAgICBuYXZiYXJDZW50ZXI6IFwiIGZsZXggdy0xLzIgbGc6MS8yIGp1c3RpZnktY2VudGVyXCIsXHJcbiAgICBuYXZiYXJFbmQ6IFwiIHctMS80IGxnOnctMS80XCIsXHJcbiAgfSxcclxuICBsb2dvOiB7XHJcbiAgICBjb250YWluZXJDbGFzczpcclxuICAgICAgXCJidG4gYnRuLWxpbmsgdGV4dC1uZXV0cmFsIG5vLXVuZGVybGluZSB0ZXh0LWJhc2UgZmxleCBqdXN0aWZ5LXN0YXJ0IGl0ZW1zLWNlbnRlciB3LTEyIHB4LTAgbWQ6dy1mdWxsIGxnOnB4LTJcIixcclxuICAgIGltZzogXCIvbG9nby5wbmdcIixcclxuICAgIGltZ0NsYXNzOiBcInctMTJcIixcclxuICAgIHRleHQ6IFwiXHUwNDEzXHUwNDM4XHUwNDM0IFx1MDQzRlx1MDQzRSBcdTA0M0RcdTA0MzVcdTA0MzRcdTA0MzJcdTA0MzhcdTA0MzZcdTA0MzhcdTA0M0NcdTA0M0VcdTA0NDFcdTA0NDJcdTA0MzhcIixcclxuICAgIHNwYW5DbGFzczogXCJoaWRkZW4gbGc6aW5saW5lLWJsb2NrIHRleHQtc20geGw6dGV4dC1iYXNlXCIsXHJcbiAgICB3OiBcIjQ4XCIsXHJcbiAgICBoOiBcIjQ4XCIsXHJcbiAgfSxcclxuICBjZW50ZXI6IHtcclxuICAgIGNvbXBvbmVudHM6IHsgc2hvd01lbnU6IHRydWUsIHNob3dDb250YWN0czogZmFsc2UgfSxcclxuICAgIG1lbnUsXHJcbiAgICBsaXN0OiB7XHJcbiAgICAgIGNsYXNzOiBcImZsZXgganVzdGlmeS1zdGFydCB3LWZ1bGwgbGc6anVzdGlmeS1jZW50ZXJcIixcclxuICAgICAgXCJsaXN0LWl0ZW1zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaW5rOiB0cnVlLFxyXG4gICAgICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1saW5rIG5vLXVuZGVybGluZSBmbGV4IGl0ZW1zLXN0YXJ0IHAtMiBnYXAtMiBib3JkZXIgYm9yZGVyLWJvdHRvbSBib3JkZXItMlwiLFxyXG4gICAgICAgICAgaWNvbjogeyBpZDogXCJlbnZlbG9wZVwiLCB3OiBcIjM2XCIsIGg6IFwiMzZcIiwgaWNvbkNsYXNzOiBcIlwiLCBjb250YWluZXJDbGFzczogXCJpY29uXCIgfSxcclxuICAgICAgICAgIHNwYW46IHsgdGV4dDogXCIrNyA5NzggMjIxIDI2IDg4XCIsIGNsYXNzOiBcImJvcmRlci1iLTIgYm9yZGVyLWFjY2VudCBweS0xIGhpZGRlbiBtZDpibG9ja1wiIH0sXHJcbiAgICAgICAgICBocmVmOiBcInRlbDorNyA5NzggMjIxIDI2IDg4XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaW5rOiB0cnVlLFxyXG4gICAgICAgICAgY2xhc3M6IFwiYnRuIGJ0bi1saW5rIG5vLXVuZGVybGluZSBmbGV4IGl0ZW1zLXN0YXJ0IHAtMiBnYXAtMlwiLFxyXG4gICAgICAgICAgaWNvbjogeyBpZDogXCJwaG9uZVwiLCB3OiBcIjM2XCIsIGg6IFwiMzZcIiwgaWNvbkNsYXNzOiBcIlwiLCBjb250YWluZXJDbGFzczogXCJpY29uXCIgfSxcclxuICAgICAgICAgIHNwYW46IHsgdGV4dDogXCJpbmZvQGdpZHJlYWx0ZXIucnVcIiwgY2xhc3M6IFwiYm9yZGVyLWItMiBib3JkZXItYWNjZW50IHB5LTEgaGlkZGVuIG1kOmJsb2NrXCIgfSxcclxuICAgICAgICAgIGhyZWY6IFwibWFpbHRvOiBpbmZvQGdpZHJlYWx0ZXIucnVcIixcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJpZ2h0OiB7XHJcbiAgICBjbGFzczogXCJidG4gYnRuLW91dGxpbmUgYmctYmFzZS0xMDAgdGV4dC14cyBtZDp0ZXh0LWJhc2UgdGV4dC1hY2NlbnQgYm9yZGVyLTIgaG92ZXI6YmctYWNjZW50IGhvdmVyOmJvcmRlci1hY2NlbnRcIixcclxuICAgIHRleHQ6IFwiXHUwNDE3XHUwNDMwXHUwNDNBXHUwNDMwXHUwNDM3XHUwNDMwXHUwNDQyXHUwNDRDIFx1MDQzN1x1MDQzMlx1MDQzRVx1MDQzRFx1MDQzRVx1MDQzQVwiLFxyXG4gICAgZHJhd2VyOiBmYWxzZSxcclxuICB9LFxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcbGF5b3V0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGxheW91dFxcXFxiYXNpYy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9sYXlvdXQvYmFzaWMuanNcIjtleHBvcnQgZGVmYXVsdHtcclxuICBcclxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxsYXlvdXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcbGF5b3V0XFxcXGZvb3Rlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9sYXlvdXQvZm9vdGVyLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbnRhaW5lckNsYXNzOiBcImZvb3RlciBiZy1iYXNlLTEwMCB0ZXh0LWNlbnRlciBwbGFjZS1pdGVtcy1jZW50ZXIgdGV4dC1iYXNlLWNvbnRlbnQgcC0xMFwiLFxyXG4gIGxvZ286IHsgaW1nOiBcIi9sb2dvLnBuZ1wiLCB0ZXh0OiBcIlx1MDQxM1x1MDQzOFx1MDQzNCBcdTA0M0ZcdTA0M0UgXHUwNDNEXHUwNDM1XHUwNDM0XHUwNDMyXHUwNDM4XHUwNDM2XHUwNDM4XHUwNDNDXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4XCIsIGNsYXNzOiBcInRleHQtc20geGw6dGV4dC1iYXNlXCIgfSxcclxuICBzb2NpYWxDbGFzczogXCJ3LTE2IGgtMTZcIixcclxuICBzb2NpYWw6IFtcclxuICAgIHsgdGl0bGU6IFwieXRcIiwgaHJlZjogXCIjc1wiLCBpY29uOiBcIi9hc3NldHMvaWNvbnMvc29jaWFsLWljb25zL3l0LnN2Z1wiIH0sXHJcbiAgICB7IHRpdGxlOiBcInZrXCIsIGhyZWY6IFwiI3NcIiwgaWNvbjogXCIvYXNzZXRzL2ljb25zL3NvY2lhbC1pY29ucy92ay5zdmdcIiB9LFxyXG4gICAgeyB0aXRsZTogXCJpZ1wiLCBocmVmOiBcIiNzXCIsIGljb246IFwiL2Fzc2V0cy9pY29ucy9zb2NpYWwtaWNvbnMvaW5zdGFncmFtLnN2Z1wiIH0sXHJcbiAgICB7IHRpdGxlOiBcImZiXCIsIGhyZWY6IFwiI3NcIiwgaWNvbjogXCIvYXNzZXRzL2ljb25zL3NvY2lhbC1pY29ucy9mYi5zdmdcIiB9LFxyXG4gICAgeyB0aXRsZTogXCJ0Z1wiLCBocmVmOiBcIiNzXCIsIGljb246IFwiL2Fzc2V0cy9pY29ucy9zb2NpYWwtaWNvbnMvdGcuc3ZnXCIgfSxcclxuICAgIHsgdGl0bGU6IFwib2tcIiwgaHJlZjogXCIjc1wiLCBpY29uOiBcIi9hc3NldHMvaWNvbnMvc29jaWFsLWljb25zL29rLnN2Z1wiIH0sXHJcbiAgXSxcclxuICBidXNpbmVzczogW1wiXHUwNDE4XHUwNDFGIFx1MDQyMlx1MDQzMlx1MDQzNVx1MDQ0MFx1MDQzNFx1MDQzRVx1MDQ0NVx1MDQzQlx1MDQzNVx1MDQzMSBcdTA0MTUuXHUwNDEyLlwiLCBcIlx1MDQxOFx1MDQxRFx1MDQxRCA5MjAxNTgzMzY2MjZcIl0sXHJcbiAgcG9saWN5OiBbXCJcdTA0MUZcdTA0M0VcdTA0M0JcdTA0MzhcdTA0NDJcdTA0MzhcdTA0M0FcdTA0MzAgXHUwNDNBXHUwNDNFXHUwNDNEXHUwNDQ0XHUwNDM4XHUwNDM0XHUwNDM1XHUwNDNEXHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDRDXHUwNDNEXHUwNDNFXHUwNDQxXHUwNDQyXHUwNDM4XCIsIFwiQ29weXJpZ2h0IChjKSAyMDJcIl0sXHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxjb21wb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGNvbXBvbmVudHNcXFxcYWNjb3JkaW9uLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzXCI7ZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNsYXNzOiBcIm1iLTQgcHgtNiBteC1hdXRvXCIsXHJcbiAgaGVhZGluZzoge1xyXG4gICAgY29udGFpbmVyOiB0cnVlLFxyXG4gICAgdGl0bGVMZXZlbDogMyxcclxuICAgIHRpdGxlOiBcIk15IEFjY29yZGlvblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGhlIGFjY29yZGlvbiBpcyBvbmx5IG9wZW4gb25lIGF0IGEgdGltZS5cIixcclxuICAgIGNsYXNzOiB7IGNvbnRhaW5lckNsYXNzOiBcIlwiLCB0aXRsZTogXCJcIiwgZGVzY3JpcHRpb246IFwiXCIgfSxcclxuICB9LFxyXG4gIGJvZHk6IFtcclxuICAgIHtcclxuICAgICAgdGl0bGU6IFwiSG93IGRvIEkgY3JlYXRlIGFuIGFjY291bnQ/XCIsXHJcbiAgICAgIHRleHQ6ICdDbGljayB0aGUgXCJTaWduIFVwXCIgYnV0dG9uIGluIHRoZSB0b3AgcmlnaHQgY29ybmVyIGFuZCBmb2xsb3cgdGhlIHJlZ2lzdHJhdGlvbiBwcm9jZXNzLicsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0aXRsZTogXCJJIGZvcmdvdCBteSBwYXNzd29yZC4gV2hhdCBzaG91bGQgSSBkbz9cIixcclxuICAgICAgdGV4dDogJ0NsaWNrIG9uIFwiRm9yZ290IFBhc3N3b3JkXCIgb24gdGhlIGxvZ2luIHBhZ2UgYW5kIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb25zIHNlbnQgdG8geW91ciBlbWFpbC4nLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6IFwiSG93IGRvIEkgdXBkYXRlIG15IHByb2ZpbGUgaW5mb3JtYXRpb24/XCIsXHJcbiAgICAgIHRleHQ6ICdHbyB0byBcIk15IEFjY291bnRcIiBzZXR0aW5ncyBhbmQgc2VsZWN0IFwiRWRpdCBQcm9maWxlXCIgdG8gbWFrZSBjaGFuZ2VzLicsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcV29ya1xcXFxDTVNcXFxcV29yZFByZXNzXFxcXE9TUFxcXFxWaXRlV1BcXFxcd3AtY29udGVudFxcXFx0aGVtZXNcXFxcVml0ZS1VSS1XUFxcXFxzcmNcXFxcZGF0YVxcXFxsYXlvdXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcbGF5b3V0XFxcXGRyYXdlci5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9sYXlvdXQvZHJhd2VyLmpzXCI7aW1wb3J0IGFjY29yZGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9hY2NvcmRpb25cIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHNob3c6IGZhbHNlLFxyXG4gIHRhYk5hbWU6IFwibXlfdGFic1wiLFxyXG4gIHRhYnM6IFtcclxuICAgIHsgdGFiTGFiZWw6IFwiVGFiIDFcIiwgY2hlY2tlZDogXCJcIiwgY29udGVudDogXCJUYWIgY29udGVudCAxXCIgfSxcclxuICAgIHsgdGFiTGFiZWw6IFwiVGFiIDJcIiwgY2hlY2tlZDogXCJjaGVja2VkXCIsIGNvbnRlbnQ6IFwiVGFiIGNvbnRlbnQgMlwiIH0sXHJcbiAgICB7IHRhYkxhYmVsOiBcIlRhYiAzXCIsIGNoZWNrZWQ6IFwiXCIsIGNvbnRlbnQ6IFwiVGFiIGNvbnRlbnQgM1wiIH0sXHJcbiAgICB7IHRhYkxhYmVsOiBcIlRhYiA0XCIsIGNoZWNrZWQ6IFwiXCIsIGNvbnRlbnQ6IFwiVGFiIGNvbnRlbnQgNFwiIH0sXHJcbiAgXSxcclxuICBhY2NvcmRpb25cclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXGRhdGFDb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcZGF0YUNvbmZpZ1xcXFxsYXlvdXQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmsvQ01TL1dvcmRQcmVzcy9PU1AvVml0ZVdQL3dwLWNvbnRlbnQvdGhlbWVzL1ZpdGUtVUktV1Avc3JjL2RhdGEvZGF0YUNvbmZpZy9sYXlvdXQuanNcIjtpbXBvcnQgaGVhZGVyIGZyb20gXCIuLi9sYXlvdXQvaGVhZGVyXCI7XHJcbmltcG9ydCBiYXNpYyBmcm9tIFwiLi4vbGF5b3V0L2Jhc2ljXCI7XHJcbmltcG9ydCBmb290ZXIgZnJvbSBcIi4uL2xheW91dC9mb290ZXJcIjtcclxuaW1wb3J0IG1vZGFsIGZyb20gXCIuLi9sYXlvdXQvbW9kYWxcIjtcclxuaW1wb3J0IGRyYXdlciBmcm9tIFwiLi4vbGF5b3V0L2RyYXdlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGJhc2ljLCBoZWFkZXIsIGZvb3RlciwgbW9kYWwsIGRyYXdlclxyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHBhZ2VzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxXb3JrXFxcXENNU1xcXFxXb3JkUHJlc3NcXFxcT1NQXFxcXFZpdGVXUFxcXFx3cC1jb250ZW50XFxcXHRoZW1lc1xcXFxWaXRlLVVJLVdQXFxcXHNyY1xcXFxkYXRhXFxcXHBhZ2VzXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Xb3JrL0NNUy9Xb3JkUHJlc3MvT1NQL1ZpdGVXUC93cC1jb250ZW50L3RoZW1lcy9WaXRlLVVJLVdQL3NyYy9kYXRhL3BhZ2VzL2luZGV4LmpzXCI7aW1wb3J0IHBhZ2VDb25maWcgZnJvbSBcIi4uL2RhdGFDb25maWcvcGFnZUNvbmZpZ1wiO1xyXG5cclxuXHJcbi8vIGxheW91dFxyXG4vLyBpbXBvcnQgYmFzaWMgZnJvbSBcIi4uL2xheW91dC9iYXNpY1wiO1xyXG5cclxuLy8gc2VjdGlvbnNcclxuaW1wb3J0IGFsbFNlY3Rpb25zIGZyb20gXCIuLi9kYXRhQ29uZmlnL3NlY3Rpb25zXCI7XHJcbmltcG9ydCBhbGxMYXlvdXRzIGZyb20gXCIuLi9kYXRhQ29uZmlnL2xheW91dFwiO1xyXG4vLyBcdTA0MTRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0M0NcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0M0VcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQ0MVx1MDQzNVx1MDQzQVx1MDQ0Nlx1MDQzOFx1MDQzOVxyXG5jb25zdCBzZWN0aW9ucyA9IHt9O1xyXG5PYmplY3Qua2V5cyhwYWdlQ29uZmlnLmluZGV4UGFnZS5zZWN0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgaWYgKHBhZ2VDb25maWcuaW5kZXhQYWdlLnNlY3Rpb25zW2tleV0pIHtcclxuICAgIHNlY3Rpb25zW2tleV0gPSBhbGxTZWN0aW9uc1trZXldO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBcdTA0MTRcdTA0MzhcdTA0M0RcdTA0MzBcdTA0M0NcdTA0MzhcdTA0NDdcdTA0MzVcdTA0NDFcdTA0M0FcdTA0M0VcdTA0MzUgXHUwNDNGXHUwNDNFXHUwNDM0XHUwNDNBXHUwNDNCXHUwNDRFXHUwNDQ3XHUwNDM1XHUwNDNEXHUwNDM4XHUwNDM1IFx1MDQzQ1x1MDQzMFx1MDQzQVx1MDQzNVx1MDQ0Mlx1MDQzRVx1MDQzMlxyXG5jb25zdCBsYXlvdXQgPSB7fTtcclxuT2JqZWN0LmtleXMocGFnZUNvbmZpZy5pbmRleFBhZ2UubGF5b3V0KS5mb3JFYWNoKChrZXkpID0+IHtcclxuICBpZiAocGFnZUNvbmZpZy5pbmRleFBhZ2UubGF5b3V0W2tleV0pIHtcclxuICAgIGxheW91dFtrZXldID0gYWxsTGF5b3V0c1trZXldO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgbWV0YTogcGFnZUNvbmZpZy5pbmRleFBhZ2UubWV0YSxcclxuICBtYWluQ2xhc3M6IFwibWItNCBweC02IG14LWF1dG9cIixcclxuICBsYXlvdXQsXHJcbiAgc2VjdGlvbnMsXHJcbiAgLy8gaGVhZGVyQ29udGV4dDoge1xyXG4gIC8vICAgbWVudTogbGF5b3V0LmhlYWRlci5jZW50ZXIubWVudSwgLy8gXHUwNDQzXHUwNDNGXHUwNDQwXHUwNDNFXHUwNDQ5XHUwNDUxXHUwNDNEXHUwNDNEXHUwNDRCXHUwNDM5IFx1MDQzMlx1MDQzOFx1MDQzNCBcdTA0MzRcdTA0M0JcdTA0NEYgXHUwNDNGXHUwNDM1XHUwNDQwXHUwNDM1XHUwNDM0XHUwNDMwXHUwNDQ3XHUwNDM4IFx1MDQzMiBcdTA0M0FcdTA0M0VcdTA0M0NcdTA0M0ZcdTA0M0VcdTA0M0RcdTA0MzVcdTA0M0RcdTA0NDJcclxuICAvLyB9LFxyXG59O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdvcmtcXFxcQ01TXFxcXFdvcmRQcmVzc1xcXFxPU1BcXFxcVml0ZVdQXFxcXHdwLWNvbnRlbnRcXFxcdGhlbWVzXFxcXFZpdGUtVUktV1BcXFxcc3JjXFxcXGRhdGFcXFxcZGF0YS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV29yay9DTVMvV29yZFByZXNzL09TUC9WaXRlV1Avd3AtY29udGVudC90aGVtZXMvVml0ZS1VSS1XUC9zcmMvZGF0YS9kYXRhLmpzXCI7aW1wb3J0IGluZGV4UGFnZSBmcm9tIFwiLi9wYWdlcy9pbmRleFwiO1xyXG4vLyBpbXBvcnQgaW5kZXhTZWN0aW9ucyBmcm9tICcuL3NlY3Rpb25zL2luZGV4U2VjdGlvbnMnXHJcblxyXG5leHBvcnQgY29uc3QgY29udGV4dERhdGEgPSB7XHJcbiAgXCIvaW5kZXguaHRtbFwiOiB7IC4uLmluZGV4UGFnZSB9LFxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJYLFNBQVMsb0JBQW9CO0FBQ3haLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUVqQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLGVBQWU7QUFDeEIsT0FBTyw0QkFBNEI7OztBQ05rWixJQUFPLGtCQUFRO0FBQUEsRUFDbGMsTUFBTTtBQUFBLElBQ0osUUFBUTtBQUFBO0FBQUEsSUFDUixTQUFTO0FBQUEsTUFDUCxXQUFXO0FBQUEsTUFDWCxZQUFZO0FBQUEsTUFDWixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxnQkFBZ0I7QUFBQSxRQUNoQixPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLEdBQUc7QUFBQSxNQUNILEdBQUc7QUFBQSxJQUNMO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsYUFBYTtBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFB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
