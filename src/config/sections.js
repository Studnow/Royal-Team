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
  slider,
  picture,
  link,
  icon,
  dynamicForm,
  ComponentsMap,
} from "../data/components/index";

import { headingHero } from "../data/components/heading.js";
import { headingSlideCard } from "../data/components/heading.js";
import { cardSlide } from "../data/components/card.js";

// Generated data and pictures

import assets from "../../assets/assets.js";
import iconsPreview from "./IconsPreview.js";

const heroData = assets.hero;
const aboutData = assets.about;
const howitworkData = assets.howitwork;
const brandImagesData = assets.brandImages;
const reviewsData = assets.reviews;
const equipmentData = assets.equipment;
const priceData = assets.price;
const promoData = assets.promo;
const faqData = assets.faq;

export const sectionsMap = {
  /**
   * Карта конфигураций всех доступных секций
   * @type {Object<string, SectionConfig>}
   */

  // Предпросмотр иконок для выбора и сортировки при старте проекта on/off in pagesConfig/homePage.js

  iconsSortingSection: {
    ...baseSection,
    template: "iconsPreview",
    style: { ...sectionStyles.wide },
    heading: { ...heading, title: "Icons Preview" },
    colClass: "col-span-12 flex flex-wrap gap-6",
    components: [iconsPreview],
  },

  hero: {
    ...heroSection,
    template: "hero",
    fullWidth: false,
    overlay: true,
    style: {
      ...sectionStyles.heroTwoColumns,
    },
    colClass: "w-1/2",
    components: [
      [
        {
          ...headingHero,
          title: heroData.heading.title,
          caption: false,
          titleLevel: "1",
          titleClass: "text-h1-clamp font-extrabold text-primary",
          container: true,
        },
        // button,
        {
          ...slider,
          slides: {
            ...slider.slides,
            slideData: heroData.slides.map((item) => ({
              ...cardSlide,
              heading: false,
              picture: { ...cardSlide.picture, src: { path: item.src?.path, item: item.src?.item } },
            })),
          },
        },
        // {
        //   ...button,
        //   text: heroData.buttonText,
        //   modal: "onclick='my_modal_1.showModal()'",
        // },
      ],

      // heroData.images.map((item) => ({
      //   ...picture,
      //   img: true,
      //   src: { path: "assets/placeholders/banners/", item: { name: item.name, ext: item.ext } },
      // })),
    ],
  },
  // about: {
  //   ...baseSection,
  //   template: "section",
  //   style: { ...sectionStyles.wide },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " 4 cards",
  //     caption: false,
  //   },
  //   colClass: "col-span-8 grid grid-cols-3 place-items-center gap-4", // строка = одинаковые классы для каждого контейнера компонентов
  //   components: Array(6).fill({ ...card, cardClass: card.cardClass + " col-span-3" }), // Если массив с массивом внутри, применяется контейнер с colClass, иначе все компоненты в одном контейнере секции, colClass не применяется
  // },

  // howitwork: {
  //   ...baseSection,
  //   template: "cards",
  //   fullWidth: false,
  //   style: { ...sectionStyles.wide },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " 2 cards",
  //   },
  //   colClass: "col-span-4 flex flex-wrap gap-4",
  //   components: [Array(3).fill(card), Array(3).fill(card)], // вместо вручную card,card,...
  // },
  // brandImages: {
  //   ...baseSection,
  //   template: "section",
  //   style: { ...sectionStyles.wide },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " 4 cards",
  //     caption: false,
  //   },
  //   colClass: "col-span-8 grid grid-cols-3 place-items-center gap-4", // строка = одинаковые классы для каждого контейнера компонентов
  //   components: Array(6).fill({ ...card, cardClass: card.cardClass + " col-span-3" }), // Если массив с массивом внутри, применяется контейнер с colClass, иначе все компоненты в одном контейнере секции, colClass не применяется
  // },
  // reviews: {
  //   ...baseSection,
  //   template: "slider",
  //   fullWidth: true,
  //   style: {
  //     ...sectionStyles.wide,
  //     sectionClass: sectionStyles.wide.sectionClass + "slider",
  //     sectionContentClass: sectionStyles.wide.sectionContentClass + " lg:grid-cols-1 slider-content container",
  //   },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " slider",
  //     container: false,
  //     caption: false,
  //     captionClass: "text-caption text-primary mb-4",
  //   },
  //   colClasses: "",
  //   components: [
  //     {
  //       ...slider,
  //       slides: {
  //         ...slider.slides,
  //         slideData: assets.sectionName.nested.items.map((item) => ({
  //           ...cardSlide,
  //           cardClass: cardSlide.cardClass + "",
  //           heading: {
  //             ...headingSlideCard,
  //             title: item.title,
  //             description: item.description,
  //           },
  //           picture: {
  //             ...picture,
  //             name: item.image.name,
  //             ext: item.image.ext,
  //             alt: item.title,
  //           },
  //           button: {
  //             ...button,
  //             class: "btn-primary",
  //             icon: false,
  //             text: item.buttonText,
  //           },
  //         })),
  //       },
  //     },
  //   ],
  // },

  // equipment: {
  //   ...baseSection,
  //   template: "test",
  //   style: {
  //     ...sectionStyles.wide,
  //     sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-cols-2",
  //   },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " test",
  //     container: false,
  //   },
  //   components: [{ ...list, listClass: list.listClass + "menu-vertical" }, picture],
  // },
  // price: {
  //   ...baseSection,
  //   template: "test",
  //   style: {
  //     ...sectionStyles.wide,
  //     sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-cols-2",
  //   },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " test",
  //     container: false,
  //   },
  //   components: [{ ...list, listClass: list.listClass + "menu-vertical" }, picture],
  // },
  // promo: {
  //   ...baseSection,
  //   template: "test",
  //   style: {
  //     ...sectionStyles.wide,
  //     sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-cols-2",
  //   },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " test",
  //     container: false,
  //   },
  //   components: [{ ...list, listClass: list.listClass + "menu-vertical" }, picture],
  // },

  // faq: {
  //   ...baseSection,
  //   template: "form",
  //   style: { ...sectionStyles.wide },
  //   heading: {
  //     ...heading,
  //     title: assets.sectionName.title + " формы",
  //     container: false,
  //   },
  //   components: [accordion, dynamicForm],
  // },
};
