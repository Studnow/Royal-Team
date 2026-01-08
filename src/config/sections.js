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
  rating,
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
    colClass: "col-span-12 w-full",
    components: [
      [
        {
          ...headingHero,
          title: heroData.heading.title,
          caption: false,
          titleLevel: "1",
          titleClass: "text-h1-clamp font-extrabold text-base-100",
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
              cardClass: cardSlide.cardClass + " min-h-[364px]",
              cardBodyClass:
                cardSlide.cardBodyClass +
                " bg-gradient-to-t from-primary to-transparent bg-gradient-to-b from-primary to-transparent",
              heading: false,
              picture: {
                ...cardSlide.picture,
                imgClass: picture.imgClass + "object-cover object-no-repeat object-left",
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
    fullWidth: false,
    style: {
      ...sectionStyles.wide,
      sectionClass: sectionStyles.wide.sectionClass + "slider",
      sectionContentClass: sectionStyles.wide.sectionContentClass + " slider-content grid-rows-2 px-8",
    },
    heading: false,
    colClass: [
      "lg:col-span-6 row-span-2 h-full",
      "lg:col-span-6 flex flex-col md:flex-row",
      "lg:col-span-6 flex flex-col md:flex-row gap-6",
    ],
    components: [
      [
        {
          ...slider,
          id: "reviews-slider",
          slides: {
            ...slider.slides,
            slideData: reviewsData.reviewsSlides.map((item) => ({
              ...cardSlide,
              cardClass: " ",
              cardPicture: false,
              cardActions: false,
              heading: {
                ...headingSlideCard,
                rating,
                title: item.title,
                titleClass: headingSlideCard.titleClass + " text-h4-clamp",
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
        heading: {
          ...heading,
          title: revievsCard.title,
          titleClass: headingSlideCard.titleClass + " text-h4-clamp",
          description: revievsCard.description,
          descriptionClass: "text-body",
        },
        cardActions: false,
        cardPicture: false,
      })),
    ],
  },

  equipment: {
    ...baseSection,
    template: "test",
    style: {
      ...sectionStyles.wide,
      sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-cols-12",
    },
    heading: {
      ...heading,
      title: equipmentData.heading.title,
      container: true,
      containerClass: "w-full flex justify-evenly items-center responsive-container",
      captionText: equipmentData.heading.caption,
      caption: true,
    },
    colClass: "",
    cardCols: ["col-span-5 col-start-3", "col-span-5"],
    components: equipmentData.equipmentCards.map((equipmentCard, index) => ({
      ...card,
      cardClass: [
        card.cardClass,
        "col-span-4 h-full", // каждая карточка — 5 колонок из 12
        index === 0 ? "col-start-4" : "col-start-8", // только для двух карточек
      ].join(" "),
      picture: { ...picture, src: equipmentCard.img.src },
      heading: {
        ...heading,
        title: equipmentCard.title,
        description: equipmentCard.description,
      },
      cardComponents: [
        {
          ...list,
          type: "list",
          listClass: list.listClass + " list-disc",
          sub: false,
          itemType: "li",
          listItems: equipmentCard.cardList.map((eqListItem) => eqListItem),
        },
      ],
      button: {
        ...button,
        class: button.class + " btn-ghost text-accent",
        text: equipmentCard.buttonText,
        icon: false,
      },
    })),
  },
  price: {
    ...baseSection,
    template: "price",
    style: {
      ...sectionStyles.wide,
      sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-cols-12",
    },
    heading: false,
    colClass: ["row-span-2 col-span-6", "col-span-5 col-start-7 mb-8", "grid grid-cols-3 gap-6 col-span-5"],
    components: [
      [{ ...picture, src: priceData.img.src, alt: priceData.img.alt, w: "880", h: "590" }],
      [
        {
          ...heading,
          title: priceData.heading.title,
          captionText: priceData.heading.caption,
          caption: true,
          container: false,
        },
      ],
      priceData.priceCards.map((priceCard) => ({
        ...card,
        heading: {
          ...headingSlideCard,
          title: priceCard.title,
          description: priceCard.description,
          titleClass: heading.titleClass + " text-h4-clamp",
          descriptionClass: headingSlideCard.descriptionClass + " font-normal",
        },
        cardPicture: false,
        cardActions: false,
        cardBodyClass: card.cardBodyClass + " p-6",
      })),
    ],
  },
  promo: {
    ...baseSection,
    template: "test",
    sectionFullWidth: true,
    style: {
      ...sectionStyles.wide,
      sectionContentClass: sectionStyles.wide.sectionContentClass,
    },
    heading: {
      ...heading,
      title: promoData.heading.title,
      description: promoData.heading.description,
      descriptionClass: heading.descriptionClass + " text-primary",
      container: true,
    },
    colClass: ["col-span-12", "col-span-5 col-start-2 flex gap-6", "col-span-5", "row-start-3 col-span-12"],
    components: [
      [
        {
          ...heading,
          title: promoData.promoCards.title,
        },
      ],
      promoData.promoCards.items.map((promoCard) => ({
        ...card,
        heading: { title: promoCard.title },
        picture: { ...picture, src: promoCard.img.src, alt: promoCard.img.alt, w: "280", h: "150" },
        cardActions: false,
      })),
      [
        {
          ...list,
          type: "list",
          sub: false,
          listClass: list.listClass + "menu-vertical",
          listItems: promoData.promoList.items.map((promoListItem) => promoListItem),
        },
      ],
      [
        {
          ...heading,
          container: true,
          containerClass: heading.containerClass + "flex self-start w-full justify-between bg-accent rounded-xl p-8",
          title: promoData.promoBanner.title,
          titleClass: heading.titleClass + " text-primary",
          description: promoData.promoBanner.items,
          descriptionClass: heading.descriptionClass + " flex flex-col p-4",
        },
      ],
    ],
  },

  faq: {
    ...baseSection,
    template: "form",
    style: { ...sectionStyles.wide },
    heading: {
      ...heading,
      title: faqData.title,
      container: false,
    },
    colClass: ["col-span-6", "col-span-6"],
    components: [
      [
        { ...heading, title: faqData.accordion.title },
        { ...accordion, listItems: faqData.accordion.items },
      ],
      [
        { ...heading, title: faqData.form.title },
        {
          ...dynamicForm,
          formClass: dynamicForm.formClass + " bg-base-100 border border-[20px] border-secondary rounded-xl",
          formText: faqData.form.description,
          fields: faqData.form.fields,
        },
      ],
    ],
  },
};
