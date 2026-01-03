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
    overlay: false,
    style: {
      ...sectionStyles.wide,
    },
    colClass: "col-span-12",
    components: [
      [
        {
          ...headingHero,
          title: heroData.heading.title,
          caption: false,
          titleLevel: "1",
          titleClass: "text-h1-clamp font-extrabold text-primary",
          container: true,
          containerClass: "absolute bottom-0 z-10 max-w-5xl",
        },
        // button,
        {
          ...slider,
          slides: {
            ...slider.slides,
            slideData: heroData.slides.map((item) => ({
              ...cardSlide,
              heading: false,
              picture: {
                ...cardSlide.picture,
                src: { path: item.src?.path, item: item.src?.item },
                w: "1920",
                h: "910",
              },
              cardActions: false,
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
  about: {
    ...baseSection,
    template: "section",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      title: aboutData.heading.title,
      description: aboutData.heading.description,
      caption: true,
      captionText: aboutData.heading.captionTop,
    },
    colClass: "col-span-12 grid grid-cols-3 place-items-center gap-4", // строка = одинаковые классы для каждого контейнера компонентов
    components: aboutData.aboutCards.map((aboutCard) => ({
      ...card,
      cardClass: card.cardClass + " col-span-3",
      heading: {
        ...heading,
        title: aboutCard.title,
        description: aboutCard.description,
      },
      cardActions: false,
    })), // Если массив с массивом внутри, применяется контейнер с colClass, иначе все компоненты в одном контейнере секции, colClass не применяется
  },

  howitwork: {
    ...baseSection,
    fullWidth: true,
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      title: howitworkData.heading.title,
    },
    colClass: ["col-span-6 flex flex-wrap gap-4", "col-span-6 flex flex-wrap gap-4"],
    components: [
      [{ ...picture, src: howitworkData.img.src, alt: howitworkData.img }],
      howitworkData.howitworkCards.map((howitworkCard) => ({
        ...card,
        heading: {
          ...heading,
          title: howitworkCard.title,
          description: howitworkCard.description,
        },
        cardPicture: false,
        cardBodyClass: card.cardBodyClass + " max-h-auto",
        cardActions: false,
      })),
    ], // вместо вручную card,card,...
  },
  brandImages: {
    ...baseSection,
    style: { ...sectionStyles.flexContent, sectionClass: sectionStyles.flexContent.sectionClass + " py-8 mb-8" },
    heading: false,
    colClass: "col-span-12 grid grid-cols-3 place-items-center gap-4", // строка = одинаковые классы для каждого контейнера компонентов
    components: brandImagesData.map((brandImage) => ({ ...picture, src: brandImage.src })), // Если массив с массивом внутри, применяется контейнер с colClass, иначе все компоненты в одном контейнере секции, colClass не применяется
  },
  reviews: {
    ...baseSection,
    template: "slider",
    fullWidth: true,
    style: {
      ...sectionStyles.wide,
      sectionClass: sectionStyles.wide.sectionClass + "slider",
      sectionContentClass:
        sectionStyles.wide.sectionContentClass + " slider-content container grid-rows-2",
    },
    heading: false,
    colClass: ["col-span-6 row-span-2", "col-span-6 flex", "col-span-6 flex"],
    components: [
      [
        {
          ...slider,
          id: "reviews-slider",
          slides: {
            ...slider.slides,
            slideData: reviewsData.reviewsSlides.map((item) => ({
              ...cardSlide,
              cardClass: cardSlide.cardClass + "",
              heading: {
                ...headingSlideCard,
                title: item.title,
                description: item.description,
              },
              // picture: {
              //   ...picture,
              //   name: item.image.name,
              //   ext: item.image.ext,
              //   alt: item.title,
              // },
            })),
          },
        },
        {
          ...button,
          class: "btn-accent",
          icon: false,
          text: reviewsData.buttonText,
        },
      ],
      [
        {
          ...heading,
          title: reviewsData.heading.title,
          container: true,
          caption: true,
          captionText: reviewsData.heading.captionTop,
          captionClass: "text-caption text-primary mb-4",
        },
      ],
      reviewsData.reviewsCards.map((revievsCard) => ({
        ...card,
        heading: { ...heading, title: revievsCard.title, description: revievsCard.description },
        cardActions: false,
        cardPicture: false,
      })),
    ],
  },

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
