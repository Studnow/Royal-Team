/**
 * Конфигурация секций для Vite-UI
 * @typedef {Object} SectionConfig
 * @property {string} template - Имя шаблона секции
 * @property {Object} style - Стили секции (см. defaultStyles/sectionStyle.js)
 * @property {Object} heading - Конфигурация заголовка
 * @property {Array} components - Массив компонентов секции
 */

// config/sections.js
import baseSection from "./base/baseSection.js";
import heroSection from "./base/heroSection.js";

import { sectionStyles } from "./defaultStyles/sectionStyle.js";

import {
  accordion,
  heading,
  card,
  button,
  list,
  listDefinition,
  slider,
  picture,
  icon,
  dynamicForm,
  rating,
  ComponentsMap,
} from "../data/components/index";
import field from "../data/components/formParts/field.js";
import select from "../data/components/formParts/select.js";
import textarea from "../data/components/formParts/textarea.js";

import { headingHero } from "../data/components/heading.js";
import { headingSlideCard } from "../data/components/heading.js";
import { cardSlide } from "../data/components/card.js";

// Generated data and pictures
import assets from "../../assets/RT-AI edit.js";

const heroData = assets.hero;
const coverData = assets.cover;
const aboutusData = assets.aboutus;
const howitworkData = assets.howitwork;
const brandsData = assets.brands;
const reviewsData = assets.reviews;
const equipmentData = assets.equipment;
const priceData = assets.price;
const extraData = assets.extra;
const faqData = assets.faq;

export const sectionsMap = {
  /**
   * Карта конфигураций всех доступных секций
   * @type {Object<string, SectionConfig>}
   */

  hero: {
    ...heroSection,
    template: "hero",
    style: { ...sectionStyles.wide },
    heading: false,
    colClass: "",
    components: [
      {
        ...slider,
        slides: {
          ...slider.slides,
          slideData: heroData.map((item) => ({
            ...cardSlide,
            heading: {
              ...headingHero,
              title: item.title,
              titleLevel: "1",
            },
            picture: {
              ...picture,
              src: item.img.src,
              alt: item.img.alt,
            },
          })),
        },
      },
    ],
  },

  cover: {
    ...baseSection,
    template: "cover",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      description: coverData.heading.description,
    },
    colClass: "",
    components: [
      {
        ...button,
        text: coverData.buttonText,
      },
      ...coverData.cards.map((item) => ({
        ...card,
        cardPicture: false,
        cardActions: false,
        heading: {
          ...heading,
          title: item.badge,
          description: item.description,
        },
      })),
      ...coverData.fields.map((item) => {
        if (item.type) {
          return {
            ...field,
            type: item.type,
            name: item.name,
            placeholder: item.placeholder,
          };
        }
        if (item.text && item.text.includes("=")) {
          return {
            ...field,
            value: item.text,
          };
        }
        return {
          ...button,
          text: item.text,
        };
      }),
    ],
  },

  aboutus: {
    ...baseSection,
    template: "aboutus",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      caption: aboutusData.heading.caption,
      captionText: aboutusData.heading.caption,
      title: aboutusData.heading.title,
      description: aboutusData.heading.description,
    },
    colClass: "",
    components: aboutusData.cards.map((item) => ({
      ...card,
      cardPicture: item.img ? true : false,
      cardActions: false,
      heading: {
        ...heading,
        title: item.title,
        description: item.description,
      },
      picture: item.img
        ? {
            ...picture,
            src: item.img.src,
            alt: item.img.alt,
          }
        : false,
      icon: item.icon
        ? {
            ...icon,
            id: item.icon.id,
            ext: item.icon.ext,
            alt: item.icon.alt,
          }
        : false,
    })),
  },

  howitwork: {
    ...baseSection,
    template: "howitwork",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      caption: howitworkData.heading.caption,
      captionText: howitworkData.heading.caption,
      title: howitworkData.heading.title,
    },
    colClass: "",
    components: [
      {
        ...picture,
        src: howitworkData.img.src,
        alt: howitworkData.img.alt,
      },
      ...howitworkData.cards.map((item) => ({
        ...card,
        cardPicture: false,
        cardActions: false,
        heading: {
          ...heading,
          title: item.title,
          description: item.description,
        },
      })),
    ],
  },

  brands: {
    ...baseSection,
    template: "brandsimages",
    style: { ...sectionStyles.wide },
    heading: false,
    colClass: "",
    components: brandsData.map((item) => ({
      ...picture,
      src: item.src,
      alt: item.alt,
    })),
  },

  reviews: {
    ...baseSection,
    template: "reviews",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      caption: reviewsData.heading.caption,
      captionText: reviewsData.heading.caption,
      title: reviewsData.heading.title,
    },
    colClass: "",
    components: [
      {
        ...slider,
        id: "reviews-slider",
        slides: {
          ...slider.slides,
          slideData: reviewsData.testimonials.map((item) => ({
            ...cardSlide,
            cardPicture: false,
            cardActions: false,
            heading: {
              ...headingSlideCard,
              title: item.author,
              description: item.text,
            },
          })),
        },
      },
      {
        ...button,
        text: reviewsData.buttonText,
      },
      ...reviewsData.cards.map((item) => ({
        ...card,
        cardPicture: false,
        cardActions: false,
        heading: {
          ...heading,
          title: item.badge,
          description: item.description,
          caption: true,
          captionText: item.caption,
        },
      })),
    ],
  },

  equipment: {
    ...baseSection,
    template: "equipment",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      caption: equipmentData.heading.caption,
      captionText: equipmentData.heading.caption,
      title: equipmentData.heading.title,
    },
    colClass: "",
    components: equipmentData.cards.map((item) => ({
      ...card,
      heading: {
        ...heading,
        title: item.title,
        description: item.description,
      },
      picture: {
        ...picture,
        src: item.img.src,
        alt: item.img.alt,
      },
      cardComponents: [
        {
          ...list,
          listItems: item.list.map((listItem) => listItem),
        },
      ],
      button: {
        ...button,
        text: item.buttonText,
      },
    })),
  },

  price: {
    ...baseSection,
    template: "price",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      caption: priceData.heading.caption,
      captionText: priceData.heading.caption,
      title: priceData.heading.title,
    },
    colClass: "",
    components: [
      {
        ...picture,
        src: priceData.img.src,
        alt: priceData.img.alt,
      },
      ...priceData.cards.map((item) => ({
        ...card,
        cardPicture: false,
        cardActions: false,
        heading: {
          ...heading,
          title: item.title,
          description: item.description,
        },
      })),
      {
        ...button,
        text: priceData.buttonText,
      },
    ],
  },

  extra: {
    ...baseSection,
    template: "extra",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      title: extraData.heading.title,
      description: extraData.heading.description,
    },
    colClass: "",
    components: [
      {
        ...heading,
        title: extraData.cards.title,
      },
      ...extraData.cards.items.map((item) => ({
        ...card,
        cardActions: false,
        heading: {
          ...heading,
          title: item.title,
        },
        picture: {
          ...picture,
          src: item.img.src,
          alt: item.img.alt,
        },
      })),
      {
        ...heading,
        title: extraData.routes.title,
      },
      {
        ...list,
        listItems: extraData.routes.items.map((item) => item),
      },
      {
        ...heading,
        title: extraData.seasonal.title,
        description: extraData.seasonal.description.join(" "),
      },
    ],
  },

  faq: {
    ...baseSection,
    template: "faq",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      title: faqData.heading.title,
    },
    colClass: "",
    components: [
      {
        ...accordion,
        listItems: faqData.accordion.map((item) => ({
          term: item.question,
          value: item.answer,
        })),
      },
      {
        ...heading,
        title: faqData.form.title,
        description: faqData.form.description,
      },
      {
        ...dynamicForm,
        fields: faqData.form.fields.map((item) => {
          if (item.type === "text") {
            return {
              ...field,
              type: item.type,
              name: item.name,
              placeholder: item.placeholder,
            };
          }
          if (item.type === "select") {
            return {
              ...select,
              name: item.name,
              placeholder: item.placeholder,
            };
          }
          if (item.type === "checkbox") {
            return {
              ...field,
              type: item.type,
              name: item.name,
              placeholder: item.placeholder,
            };
          }
          return field;
        }),
      },
      {
        ...button,
        text: faqData.form.buttonText,
      },
    ],
  },
};
