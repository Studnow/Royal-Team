import { button, list, listDefinition, logo, picture, link, icon, ComponentsMap, dynamicForm } from "../../data/components/index";

import field from "../components/formParts/field.js";

const menu = list;

const imagesPath = "assets/images/";
const iconsPath = "assets/icons/";

import assets from "../../../assets/assets.js";

const heroData = assets.hero;

export default {
  template: "header",
  navbar: {
    headerClass: " fixed  bg-primary bg-gradient-to-b from-primary z-10 w-full bg-opacity-50",
    containerClass: " mx-auto",
    navbarClass: " bg-transparent justify-between min-h-32",
    navbarStart: " w-1/6 lg:w-1/4",
    navbarCenter: " flex w-0 lg:w-auto justify-center",
    navbarEnd: " w-1/4 md:w-auto lg:w-1/2 xl:w-1/3",
  },
  start: {
    components: [
      {
        ...logo,
        containerClass: logo.containerClass + " h-fit",
        text: false,
        img: { path: imagesPath, name: "logo", ext: "png", alt: logo.img.alt },
        imgClass: "w-56 h-24 self-top",
        w: "200",
        h: "90",
      },
      // { ...menu, type: "list-menu", dropdownContent: "menu w-80 bg-base-100 lg:hidden rounded-sm", listItems: assets.hero.heroMenu.map((item) => ({...link, text: item})) },
    ],
  },
  center: {
    componentsToggle: { showMenu: false, showContacts: false },

    // list: {...list, listClass: "hidden md:flex menu menu-horizontal" },
    components: [],
  },
  right: {
    drawer: true,
    colClass: ["inline", "absolute"],
    components: [
      [{
        ...menu,
        listClass:
          menu.listClass + "justify-between bg-primary rounded-full flex-nowrap hidden lg:flex menu-horizontal",
        type: "list-menu",
        sub: false,
        listItems: heroData.heroMenu.map((item) => ({
          ...link,
          class: link.class + "no-underline",
          text: item,
          textClass: link.textClass + "text-base-100 font-medium",
          icon: false,
        })),
      },
      // { ...button, icon: false },
      {
        type: "drawerBtn",
        class: "btn btn-primary drawer-button lg:hidden",
        icon: { ...icon, id: "burgerMenu", class: "h-8 w-8 rotate-180" },
      },],
      [{ ...listDefinition }, { ...field }],
    ],
  },
  drawer: {
    components: [
      {
        ...menu,
        listClass: menu.listClass + "justify-between bg-primary w-full",
        type: "list-menu",
        sub: false,
        listItems: heroData.heroMenu.map((item) => ({
          ...link,
          class: link.class + "no-underline",
          text: item,
          textClass: link.textClass + "text-base-100 font-medium",
          icon: false,
        })),
      },
    ],
  },
};

export const headerLogoCentered = {
  // raw template
  template: "header",
  navbar: {
    headerClass: " bg-black",
    containerClass: " mx-auto max-w-full",
    navbarClass: " bg-transparent gap-1 py-0 lg:px-8 min-h-fit responsive-container max-w-full",
    navbarStart: " w-1/3 lg:w-1/4 gap-1 justify-start h-max",
    navbarCenter: " flex w-auto justify-center h-max",
    navbarEnd: " w-1/3 lg:w-1/3 justify-end gap-1 h-max",
  },
  start: {
    componentsToggle: { showMenu: true, showContacts: false },
    menu: {
      ...menu,
      variant: "dropdown",
      sub: true,
      actions: false,
      dropdownClass: "lg:block",
      dropdownContent: "menu w-80 bg-primary text-base-200 rounded-sm",
      dropdownBtnClass: "bg-black text-base-100",
      icon: { ...icon, id: "burgerMenu", class: "h-12 w-12" },
      // listItems: assets.header.menu.navLinks.map((item) => ({
      //   ...link,
      //   text: item,
      //   class: link.class.concat(" no-underline px-0 py-2 hover:circle text-body"),
      //   textClass: "text-nowrap overflow-hidden text-ellipsis",
      //   icon: false,
      // })),
    },
    // select: assets.header.text.lang,
    // phone: {
    //   ...link,
    //   text: assets.header.text.phone,
    //   icon: false,
    //   class: "text-base-100 hidden lg:flex hover:underline",
    // },
  },
  center: {
    componentsToggle: { showMenu: false, showContacts: false },
    menu: { ...menu },
    logo: {
      ...logo,
      containerClass: logo.containerClass.concat(" w-32 lg:justify-center"),
      //   img: { name: `assets/images/${assets.header.logo.name}`, ext: assets.header.logo.ext },
    },
    // list: {...list, listClass: "hidden md:flex menu menu-horizontal" },
  },
  right: {
    // buttons: assets.header.icons.end.map((item, index, arr) => {
    //   const isFirstOrLast = index === 0 || index === arr.length - 1;
    //   const adaptiveClass = isFirstOrLast ? "inline-flex" : "hidden lg:inline-flex";
    //   return {
    //     ...button,
    //     text: false,
    //     class: button.class.concat(
    //       ` bg-black hover:bg-primary border-none text-base-100 inline-flex items-center px-0 ${adaptiveClass}`
    //     ),
    //     icon: { ...icon, id: item.name, w: 24, h: 24, class: "w-12 h-12 overflow-visible align-middle" },
    //   };
    // }),
    class:
      "btn btn-outline max-w-24 bg-base-100 text-xs md:text-base text-accent border-2 hover:bg-accent hover:border-accent",
    text: "Заказать звонок",
    drawer: false,
    drawerBtn: {
      class: "btn btn-primary drawer-button lg:hidden",
      icon: { ...icon, id: "burgerMenu", class: "h-8 w-8 rotate-180" },
    },
  },
};
