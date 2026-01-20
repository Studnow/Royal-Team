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
      sectionClass: sectionStyles.wide.sectionHeroClass,
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
        titleClass: ["text-h4-clamp self-start font-medium"].join(" "),
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
    fullWidth: false,
    style: {
      ...sectionStyles.wide,
      sectionClass: sectionStyles.wide.sectionClass + " px-6",
      sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-auto-rows xl:auto-rows-min",
    },
    heading: {
      ...heading,
      containerClass: heading.containerClass + " md:w-3/4 md:self-start xl:hidden",
      title: howitworkData.heading.title,
      titleClass: heading.titleClass + " mb-3 xl:mb-6 font-medium",
      caption: true,
      captionText: howitworkData.heading.captionTop,
    },
    colClass: [
      "order-2 xl:order-1 md:col-span-12 xl:col-span-6 md:row-start-2 xl:row-span-2 xl:row-start-1 flex flex-wrap gap-4",
      "hidden xl:block xl:col-span-4",
      "md:col-span-9 xl:col-span-6 md:col-start-4 flex flex-col",
    ],
    components: [
      [{ ...picture, src: howitworkData.img.src, alt: howitworkData.img.alt, w: "880", h: "560" }],
      [
        {
          ...heading,
          // containerClass: heading.containerClass + " hidden xl:block",
          title: howitworkData.heading.title,
          caption: true,
          captionText: howitworkData.heading.captionTop,
        },
      ],
      howitworkData.howitworkCards.map((howitworkCard) => ({
        ...card,
        heading: {
          ...heading,
          title: howitworkCard.title,
          titleClass: heading.titleClass + " text-h4-clamp self-start font-medium",
          description: howitworkCard.description,
        },
        cardPicture: false,
        cardBodyClass: card.cardBodyClass + " xl:p-5",
        cardActions: false,
      })),
    ], // вместо вручную card,card,...
  },
  brandImages: {
    ...baseSection,
    style: {
      ...sectionStyles.flexContent,
      sectionClass: sectionStyles.flexContent.sectionClass + " py-8",
      sectionContentClass: sectionStyles.flexContent.sectionContentClass + " flex-wrap gap-2 w-full",
    },
    heading: false,
    colClass: "col-span-12 grid grid-cols-3 place-items-center gap-4", // строка = одинаковые классы для каждого контейнера компонентов
    components: brandImagesData.map((brandImage) => ({
      ...picture,
      src: brandImage.src,
      alt: brandImage.alt,
      imgClass: "w-[160px] md:w-[340px] h-[85px] md:h-[180px]",
    })), // Если массив с массивом внутри, применяется контейнер с colClass, иначе все компоненты в одном контейнере секции, colClass не применяется
  },
  reviews: {
    ...baseSection,
    template: "slider",
    fullWidth: false,
    style: {
      ...sectionStyles.wide,
      sectionClass: sectionStyles.wide.sectionClass,
      sectionContentClass: sectionStyles.wide.sectionContentClass + " grid-rows-auto px-8 xl:place-items-start",
    },
    heading: false,
    colClass: [
      "w-full md:col-span-12 lg:row-span-2 order-3 xl:order-1 xl:col-span-5 xl:row-start-1 xl:row-span-2",
      "md:col-span-12 xl:col-span-5 xl:col-start-7 flex flex-col md:flex-row",
      "md:col-span-12 xl:col-span-6 xl:col-start-7 grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
    ],
    components: [
      [
        {
          ...slider,
          id: "reviews-slider",
          slides: {
            ...slider.slides,
            slideData: reviewsData.reviewsSlides.map((item) => ({
              ...card,
              cardClass: [card.cardClass, "bg-base-100 rounded-xl"].join(" "),
              cardPicture: false,
              cardActions: false,
              heading: {
                ...headingSlideCard,
                rating,
                title: item.title,
                titleClass: headingSlideCard.titleClass + " text-h4-clamp font-medium md:text-h3-clamp",
                description: `"${item.description}"`,
                descriptionClass: [
                  headingSlideCard.descriptionClass,
                  "italic text-secondary md:text-h4-clamp xl:text-h5-clamp",
                ].join(" "),
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
          class:
            "btn-accent w-full bg-gradient-to-t from-accent to-base-100/80 md:col-start-2 text-lead font-medium h-20 shadow-md shadow-primary/40",
          icon: false,
          text: reviewsData.buttonText,
        },
      ],
      [
        {
          ...heading,
          title: reviewsData.heading.title,
          titleClass: [heading.titleClass, "font-medium"].join(" "),
          container: true,
          containerClass: "",
          caption: true,
          captionText: reviewsData.heading.captionTop,
          captionClass: "text-caption text-secondary uppercase mb-4",
        },
      ],
      reviewsData.reviewsCards.map((reviewsCard) => ({
        ...card,
        cardClass: [card.cardClass, "h-full border rounded-xl md:w-72 xl:w-full"].join(" "),
        cardBodyClass: [card.cardBodyClass, "p-6"].join(" "),
        heading: {
          ...heading,
          title: reviewsCard.title,
          titleLevel: "4",
          titleClass:
            headingSlideCard.titleClass + " text-h5-clamp font-medium md:text-h4-clamp xl:text-h5-clamp flex flex-col",
          description: reviewsCard.description,
          descriptionClass: "text-body text-secondary md:text-[20px]",
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
      sectionClass: [sectionStyles.wide.sectionClass, "px-6"].join(" "),
      sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-cols-12 md:gap-10",
    },
    heading: {
      ...heading,
      title: equipmentData.heading.title,
      titleClass: [heading.titleClass, "font-medium uppercase w-full"].join(" "),
      container: true,
      containerClass: "w-full flex flex-col xl:flex-row mb-14 gap-x-36",
      captionText: equipmentData.heading.caption,
      captionClass: heading.captionClass + " self-start xl:mb-0 align-middle",
      caption: true,
    },
    colClass: "",
    // cardCols: ["lg:col-span-5 lg:col-start-3", "lg:col-span-5"],
    components: equipmentData.equipmentCards.map((equipmentCard, index) => ({
      ...card,
      cardActions: true,
      cardClass: [
        card.cardClass,
        "md:col-span-12 lg:col-span-5 h-full border border-secondary/30", // каждая карточка — 5 колонок из 12
        index === 0 ? "lg:col-start-3" : "lg:col-start-8", // только для двух карточек
      ].join(" "),
      cardBodyClass: [card.cardBodyClass, "px-3 py-6"].join(" "),
      picture: { ...picture, imgClass: "rounded-xl", src: equipmentCard.img.src },
      heading: {
        ...heading,
        title: equipmentCard.title,
        titleClass: [heading.titleClass, "font-medium text-h4-clamp mb-3"].join(" "),
        description: equipmentCard.description,
        descriptionClass: [heading.descriptionClass, "text-body text-secondary mb-6"].join(" "),
      },
      cardComponents: [
        {
          ...list,
          type: "list",
          listClass: list.listClass + " list-disc px-6 text-h-5-clamp font-medium",
          sub: false,
          itemType: "li",
          listItems: equipmentCard.cardList.map((eqListItem) => eqListItem),
        },
      ],
      actions: [
        {
          ...link,
          class: link.class + " text-accent px-0 text-h4-clamp font-medium underline underline-offset-2",
          text: equipmentCard.buttonText,
          icon: false,
        },
      ],
    })),
  },
  price: {
    ...baseSection,
    template: "price",
    style: {
      ...sectionStyles.wide,
      sectionClass: [sectionStyles.wide.sectionClass, " px-6"].join(" "),
      sectionContentClass: sectionStyles.wide.sectionContentClass + " md:grid-cols-12",
    },
    heading: false,
    colClass: [
      "md:col-span-12 xl:row-span-2 xl:col-span-6 row-start-3 xl:row-start-1",
      "md:col-span-12 xl:col-span-5 xl:col-start-7",
      "md:col-span-10 md:col-start-2 xl:col-start-7 grid grid-cols-2 xl:grid-cols-3 gap-5 xl:col-span-6",
    ],
    components: [
      [{ ...picture, src: priceData.img.src, alt: priceData.img.alt, w: "880", h: "590" }],
      [
        {
          ...heading,
          title: priceData.heading.title,
          titleClass: [heading.titleClass, "md:text-h1-clamp"].join(" "),
          captionText: priceData.heading.caption,
          captionClass: [heading.captionClass, " xl:mb-0"],
          caption: true,
          container: false,
        },
      ],
      priceData.priceCards.map((priceCard, index) => ({
        ...card,
        cardClass:
          index !== priceData.priceCards.length - 1
            ? [card.cardClass, " border border-secondary/30 xl:w-[280px] xl:max-h-[170px] h-full"].join(" ")
            : [card.cardClass, ""].join(" "),
        cardBodyClass:
          index !== priceData.priceCards.length - 1
            ? [(card.cardBodyClass, " p-5 justify-between")].join(" ")
            : [card.cardBodyClass, "p-0"].join(" "),
        heading: {
          ...headingSlideCard,
          title: priceCard.title,
          description: priceCard.description,
          titleClass: heading.titleClass + " text-[20px] font-medium mb-2",
          descriptionClass:
            headingSlideCard.descriptionClass + " font-normal text-secondary md:text-h5-clamp xl:text-body",
        },
        cardComponents:
          index !== priceData.priceCards.length - 1
            ? false
            : [
                {
                  type: "paragraph",
                  class: " text-accent text-center",
                  text: priceCard.caption,
                },
                {
                  ...button,
                  class: [
                    button.class,
                    "bg-gradient-to-t from-accent to-base-100/80 min-h-[118px] md:min-h-[78px] font-medium shadow-md shadow-primary/40",
                  ].join(" "),
                  text: priceCard.buttonText,
                  textClass: "text-h5-clamp md:text-lead",
                  icon: false,
                },
              ],
        cardPicture: false,
        cardActions: false,
      })),
    ],
  },
  promo: {
    ...baseSection,
    template: "promo",
    sectionFullWidth: false,
    style: {
      ...sectionStyles.wide,
      sectionClass: [sectionStyles.wide.sectionClass, " px-6"].join(" "),
      sectionContentClass: [sectionStyles.wide.sectionContentClass, ""].join(" "),
    },
    heading: {
      ...heading,
      title: promoData.heading.title,
      titleClass: [heading.titleClass, "font-medium mb-3 md:text-h1-clamp uppercase"].join(" "),
      description: promoData.heading.description,
      descriptionClass:
        heading.descriptionClass + " text-primary text-h5-clamp md:text-h4-clamp md:max-w-2xl xl:max-w-none",
      container: true,
      containerClass: [heading.containerClass, "mb-14"].join(" "),
    },
    colClass: [
      "md:col-span-8 md:col-start-2 xl:col-start-1 xl:col-span-12 w-full",
      "md:col-span-10 md:col-start-2 grid grid-cols-2 xl:grid-flow-col xl:col-span-8 xl:col-start-1 flex gap-6 mb-12",
      "md:col-span-10 md:col-start-2 xl:col-start-10 w-full xl:col-span-4 mb-12",
      "md:col-span-12 md:w-screen xl:w-full xl:row-start-3 xl:col-span-12",
    ],
    components: [
      [
        {
          ...heading,
          title: promoData.promoCards.title,
          titleClass: [heading.titleClass, "font-medium mb-3 md:text-h1-clamp uppercase"].join(" "),
        },
      ],
      promoData.promoCards.items.map((promoCard) => ({
        ...card,
        cardClass: [card.cardClass, ""].join(" "),
        cardBodyClass: [card.cardBodyClass, "px-0 py-3"].join(" "),
        heading: {
          title: promoCard.title,
          titleClass: [heading.titleClass, "text-h5-clamp font-medium md:text-h4-clamp"].join(" "),
        },
        picture: {
          ...picture,
          imgClass: [picture.imgClass, "rounded-2xl"].join(" "),
          src: promoCard.img.src,
          alt: promoCard.img.alt,
          w: "280",
          h: "150",
        },
        cardActions: false,
      })),
      [
        {
          ...heading,
          title: promoData.promoList.title,
          titleClass: [heading.titleClass, "font-medium mb-3 uppercase md:mb-8"].join(" "),
        },
        {
          ...list,
          type: "list",
          sub: false,
          listClass: list.listClass + "menu-vertical font-medium md:text-h4-clamp space-y-2",
          listItems: promoData.promoList.items.map((promoListItem) => promoListItem),
        },
      ],
      [
        {
          ...heading,
          container: true,
          containerClass:
            heading.containerClass +
            "flex flex-col xl:flex-row w-full bg-accent rounded-xl px-5 md:px-9 py-12 xl:p-8 justify-evenly",
          title: promoData.promoBanner.title,
          titleClass: heading.titleClass + " text-primary font-medium mb-6 uppercase",
          description: promoData.promoBanner.items,
          descriptionClass: heading.descriptionClass + " flex flex-col text-h5-clamp xl:p-4 md:max-w-none md:w-5/6",
        },
      ],
    ],
  },

  faq: {
    ...baseSection,
    template: "form",
    style: {
      ...sectionStyles.wide,
      sectionContentClass: [sectionStyles.wide.sectionContentClass, "xl:place-items-start"].join(" "),
    },
    heading: {
      ...heading,
      title: faqData.title,
      container: false,
    },
    colClass: ["md:col-span-12 xl:col-span-6 mb-28 xl:mb-12", "md:col-span-12 xl:col-span-6 mb-28 xl:mb-12"],
    components: [
      [
        { ...heading, title: faqData.accordion.title, titleClass: [heading.titleClass, "font-medium mb-16"].join(" ") },
        { ...accordion, listItems: faqData.accordion.items },
      ],
      [
        {
          ...heading,
          title: faqData.form.title,
          titleClass: [heading.titleClass, "font-medium mb-16 xl:w-2/3 xl:mb-8"].join(" "),
        },
        {
          ...dynamicForm,
          formClass:
            dynamicForm.formClass +
            " bg-base-100 bg-gradient-to-br from-primary/60 to-secondary/40 rounded-xl p-[20px]",
          container: true,
          containerClass: [dynamicForm.containerClass, "justify-center"].join(" "),
          // controlClass: "p-6",
          formText: faqData.form.description,
          formTextClass: " p-6",
          fields: faqData.form.fields.map((formField, index) => ({
            ...field,
            inputClass:
              index !== faqData.form.fields.length - 1
                ? [formField.inputClass, " xl:w-xl"].join(" ")
                : formField.inputClass,
            placeholder: formField.placeholder,
            controlClass:
              index !== faqData.form.fields.length - 1
                ? [formField.controlClass, "p-[20px]"].join(" ")
                : [formField.controlClass, "w-full"].join(" "),
            label: formField.label,
            type: formField.type,
            name: formField.name,
            partial: formField?.partial,
            text: formField?.text,
            class: formField?.class,
          })),
        },
      ],
    ],
  },
};
