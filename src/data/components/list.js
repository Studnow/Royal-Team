// import listItems from "../../../assets/data.js";
import link from "./link.js";
import button from "./button.js";

export const ListSubmenu = {
  type: "list-menu",
  title: false,
  listType: "ul",
  class: "w-full bg-neutral-200",
  listClass:
    "menu space-x-2 p-2 bg-base-100 rounded-box z-[1] mt-3 w-full " /* for no menu lists list-image-[url('/assets/icons/vite.svg')]; */,
  subListClass: "menu menu-horizontal p-2 bg-base-100 rounded-box z-[1] mt-3 w-full",
  // dropdownClass: "dropdown-bottom",
  // dropdownContent: "",
  variant: "menu", // list, menu, dropdown, nav
  actions: false,
  sub: true,
  listItems:
    // [
    //   { ...link, class: "link no-underline text-primary hover:underline", text: "Не смотреть", icon: false },
    //   { ...link, class: "link no-underline text-primary hover:underline", text: "Посмотреть", icon: false },
    //   { ...link, class: "link no-underline text-primary hover:underline", text: "Не смотреть", icon: false },
    //   { ...link, text: "Пыщь пыщь пыщь", icon: false },
    //   { ...link, text: "тыщь тыщь тыщь", icon: false },
    //   { ...link, text: "Пыщь пыщь пыщь", icon: false },
    //   ],

    {
      before: [
        {
          ...link,
          class: "link no-underline text-primary hover:underline text-sm px-2",
          text: "Не смотреть каталог",
          icon: false,
        },
        {
          ...link,
          class: "link no-underline text-primary hover:underline text-sm px-2",
          text: "Посмотреть каталог",
          icon: false,
        },
      ],
      subHeading: "subheading",
      subHeadingClass: "link no-underline hover:underline text-sm px-2",
      subItems: [
        { ...link, class: "link no-underline text-primary hover:underline text-sm px-2", text: "Не смотреть" },
        { ...link, class: "link no-underline text-primary hover:underline text-sm px-2", text: "Посмотреть" },
      ],
      after: [
        {
          ...link,
          class: "link no-underline text-primary hover:underline text-sm px-2",
          text: "Не смотреть",
          icon: false,
        },
        {
          ...link,
          class: "link disabled no-underline text-primary hover:underline text-sm px-2",
          text: "Посмотреть",
          icon: false,
        },
      ],
    },

  // {
  //   subHeading: "Vehicles",
  //   menuClass: /*tw*/ "menu menu-horizontal p-2 bg-base-200 w-max right-0 top-15 z-10 text-primary-content",
  //   menuSmClass: /*tw*/ "menu p-2 bg-base-100 w-36 z-10",
  //   listItems: [
  //     { title: "Машины", items: ["Chevrolet", "my Car", "Your Car"] },
  //     { title: "Автомобили", items: ["Chevrolet", "my Car", "Your Car"] },
  //     { title: "Транспорт", items: ["Chevrolet", "my Car", "Your Car"] },
  //   ],
  // },
};

export const ListDropdown = {
  type: "list-dropdown",
  title: false,
  listType: "ul",
  class: "w-full bg-neutral-200",
  listClass:
    "menu menu-horizontal hidden lg:flex space-x-2 p-2 bg-base-100 rounded-box z-[1] mt-3 w-full " /* for no menu lists list-image-[url('/assets/icons/vite.svg')]; */,
  dropdownClass: "dropdown-bottom",
  dropdownContent: "",
  variant: "menu", // list, menu, dropdown, nav
  actions: false,
  sub: true,
  listItems: [
    { ...link, class: "link no-underline text-primary hover:underline", text: "Не смотреть", icon: false },
    { ...link, class: "link no-underline text-primary hover:underline", text: "Посмотреть", icon: false },
    { ...link, class: "link no-underline text-primary hover:underline", text: "Не смотреть", icon: false },
    { ...link, text: "Пыщь пыщь пыщь", icon: false },
    { ...link, text: "тыщь тыщь тыщь", icon: false },
    { ...link, text: "Пыщь пыщь пыщь", icon: false },
  ],
};

export default ListSubmenu;
