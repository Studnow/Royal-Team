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
  link,
  icon,
  dynamicForm,
  rating,
  ComponentsMap,
} from "../data/components/index";
import field from "../data/components/formParts/field.js";

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
      sectionClass: sectionStyles.wide.sectionClass + " lg:py-8",
    },
    colClass: ["col-span-1 md:col-span-12 w-full"],
    colContainer: true,
    components: [
      [
        {
          ...slider,
          slides: {
            ...slider.slides,
            slideData: heroData.slides.map((item) => ({
              ...cardSlide,
              cardClass: cardSlide.cardClass + " min-h-[364px] max-h-screen",
              cardBodyClass:
                cardSlide.cardBodyClass +
                " p-6 bg-gradient-to-t from-primary to-transparent bg-gradient-to-b from-primary to-transparent justify-end",
              heading: {
                ...headingHero,
                title: heroData.heading.title,
                caption: false,
                titleLevel: "1",
                titleClass: "text-h1-clamp font-medium font-unbounded text-base-100 md:w-3/4 lg:w-2/4 md:px-6",
                container: true,
                containerClass: "absolute bottom-0 z-10 max-w-5xl",
              },
              picture: {
                ...cardSlide.picture,
                imgClass: picture.imgClass + "object-contain object-no-repeat object-left",
                src: { path: item.src?.path, item: item.src?.item },
                w: "1920",
                h: "910",
              },
              cardActions: false,
            })),
          },
        },
      ],

      // heroData.images.map((item) => ({
      //   ...picture,
      //   img: true,
      //   src: { path: "assets/placeholders/banners/", item: { name: item.name, ext: item.ext } },
      // })),
    ],
  },
  calculator: {
    ...baseSection,
    template: "calculator",
    style: {
      ...sectionStyles.wide,
      sectionClass: sectionStyles.wide.sectionClass + " lg:hidden p-6 mb-14 md:p-10 bg-base-100",
      sectionContentClass:
        sectionStyles.wide.sectionContentClass +
        " bg-gradient-to-br from-primary/70 to-primary/30 rounded-3xl p-6 md:p-4",
    },
    heading: false,
    colClass: ["w-full md:col-span-12", "w-full md:col-span-12"],
    components: [
      [
        {
          ...listDefinition,
          class:
            listDefinition.class +
            " w-full px-6 md:px-4 py-4 grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 text-base-100",
          items: heroData.heroDefList.map((item) => ({
            ...item,
            dlContainerClass: item.term.includes("253-264-9577")
              ? listDefinition.dlContainerClass + " row-start-3 col-start-2 gap-1"
              : listDefinition.dlContainerClass + " w-full col-start-1 gap-1",
            dtClass: item.term.includes("253-264-9577")
              ? "text-accent text-h4-clamp md:text-h3-clamp"
              : "text-h4-clamp md:text-h3-clamp",
            ddClass: "text-body",
          })),
        },
      ],
      [
        {
          type: "calculator",
          class: "grid grid-cols-1 md:grid-cols-2 md:grid-cols-[6fr_2fr] md:gap-6 md:p-4 bg-base-100 rounded-2xl",
          components: [
            {
              ...heading,
              container: false,
              title: heroData.heroForm.title,
              titleLevel: 3,
              titleClass: "text-h3-clamp font-medium px-6 pt-6 md:pt-0 md:px-0 md:col-span-2",
            },
            {
              ...field,
              wrapLabel: true,
              label: heroData.heroForm.calcResult,
              class:
                field.labelClass +
                "flex flex-col flex-col-reverse md:flex-row items-start md:items-center md:justify-end md:flex-row-reverse md:col-start-1 px-6 md:px-0 pb-4 md:pb-0 gap-6",
              inputClass: field.inputClass + " bg-base-200",
              placeholder: heroData.heroForm.field,
            },
            {
              ...button,
              class: button.class + " bg-gradient-to-t from-accent to-base-100 md:col-start-2 md:h-28 text-lead",
              text: heroData.heroForm.buttonText,
              icon: false,
              modal: "onclick='my_modal_1.showModal()'",
            },
          ],
        },
      ],
    ],
  },
  about: {
    ...baseSection,
    template: "section",
    style: {
      ...sectionStyles.wide,
      sectionClass: sectionStyles.wide.sectionContentCardsClass + " grid-cols-2 md:grid-cols-2 p-[25px] mb-14",
      sectionContentClass: false,
      // sectionStyles.wide.sectionContentCardsClass + " gap-[20px] md:px-20 xl:subgrid xl:col-span-12 xl:row-start-1 xl:col-start-9",
    },
    heading: {
      ...heading,
      containerClass: "col-span-2 md:col-span-2 xl:col-span-8 xl:w-3/5",
      title: aboutData.heading.title,
      titleClass: heading.titleClass + " mb-3 xl:mb-6 font-medium",
      description: aboutData.heading.description,
      descriptionClass: heading.descriptionClass + " xl:text-h5-clamp",
      caption: true,
      captionText: aboutData.heading.captionTop,
    },
    // colClass: "col-span-12 grid grid-cols-3 place-items-center gap-4", // строка = одинаковые классы для каждого контейнера компонентов
    components: aboutData.aboutCards.map((aboutCard) => ({
      ...card,
      cardPicture: aboutCard.img ? true : false,
      cardClass: aboutCard.img
        ? card.cardClass + " border h-full xl:col-span-2"
        : card.cardClass + " border h-full xl:col-span-2",
      cardBodyClass: card.cardBodyClass + " p-3 md:p-6",
      cardActions: false,
      heading: {
        ...heading,
        title: aboutCard.title,
        titleClass: ["text-h5-clamp self-start"].join(" "),
        description: aboutCard.description,
        descriptionClass: heading.descriptionClass + " xl:text-body",
      },
      picture: { ...picture, src: aboutCard.img?.src },
      icon: aboutCard.icon
        ? {
            ...icon,
            class: icon.class + " w-[20px] md:w-14 h-[20px] md:h-14 md:mb-8",
            id: aboutCard.icon?.id,
            ext: aboutCard.icon?.ext,
            alt: aboutCard.icon?.alt,
            w: "20",
            h: "20",
          }
        : false,
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
      "w-full lg:col-span-6 lg:row-span-2 h-full",
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
      containerClass: "w-full flex flex-col lg:flex-row justify-evenly items-center responsive-container",
      captionText: equipmentData.heading.caption,
      captionClass: heading.captionClass + " self-start",
      caption: true,
    },
    colClass: "",
    cardCols: ["lg:col-span-5 lg:col-start-3", "lg:col-span-5"],
    components: equipmentData.equipmentCards.map((equipmentCard, index) => ({
      ...card,
      cardClass: [
        card.cardClass,
        "lg:col-span-4 h-full", // каждая карточка — 5 колонок из 12
        index === 0 ? "lg:col-start-4" : "lg:col-start-8", // только для двух карточек
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
    colClass: [
      "lg:row-span-2 lg:col-span-6",
      "lg:col-span-5 lg:col-start-7 mb-8",
      "grid grid-cols-1 lg:grid-cols-3 gap-6 lg:col-span-5",
    ],
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
    colClass: [
      "lg:col-span-12",
      "flex flex-wrap lg:col-span-5 lg:col-start-2 flex gap-6",
      "lg:col-span-5",
      "lg:row-start-3 lg:col-span-12",
    ],
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
