import logo from "../components/logo";
import icon from "../components/icon";
import link from "../components/link";
import { socialLink } from "../components/link";
//lists
import list from "../components/list";

const nav = list;
const social = list;
const policy = list;

// data

import assets from "../../../assets/assets.js";

const footerData = assets.footer;

export default {
  template: "footer",
  containerClass: "footer grid-cols-2 grid-rows-3 md:grid-rows-2 xl:grid-rows-1 xl:grid-cols-12 md:gap-x-40 bg-primary place-items-start text-base-100 p-10",
  components: footerData.columns.map((footerNavList, index) => ({
    ...nav,
    type: "list-nav",
    title: footerNavList.title,
    class:
      index === 0
        ? [nav.class, "col-span-2 md:col-span-1 xl:col-span-4"].join(" ")
        : index < 3
        ? [nav.class, "col-span-1 xl:col-span-2"].join(" ")
        : "col-span-2 md:col-span-1 xl:col-span-4",
    listItems: footerNavList.items.map((item) => ({
      ...link,
      class: link.class + " no-underline",
      text: item,
      icon: false,
    })),
  })),
  // [
  // {
  // ...nav,
  // type: "list-nav",
  // title: false,
  // class: "",
  // listItems: .items.map((item) => ({...link, text:item, icon: false}))
  // [
  //   { ...link, class: "link no-underline hover:underline", text: "ИП Твердохлеб Е.В.", icon: false },
  //   { ...link, class: "link no-underline hover:underline", text: "ИНН 920158336626", icon: false },
  //   "ИНН 920158336626",
  // ],
  //   },
  //   {
  //     ...nav,
  //     type: "list-nav",
  //     title: false,
  //     class: "",
  //     listItems: [
  //       { ...link, class: "link no-underline hover:underline", text: "ИП Твердохлеб Е.В.", icon: false },
  //       { ...link, class: "link no-underline hover:underline", text: "ИНН 920158336626", icon: false },
  //       "ИНН 920158336626",
  //     ],
  //   },
  //   {
  //     ...nav,
  //     type: "list-nav",
  //     title: false,
  //     class: "",
  //     listItems: [
  //       { ...link, class: "link no-underline hover:underline", text: "ИП Твердохлеб Е.В.", icon: false },
  //       { ...link, class: "link no-underline hover:underline", text: "ИНН 920158336626", icon: false },
  //       "ИНН 920158336626",
  //     ],
  //   },
  //   {
  //     ...nav,
  //     type: "list-nav",
  //     title: false,
  //     class: "",
  //     listItems: [
  //       { ...link, class: "link no-underline hover:underline", text: "ИП Твердохлеб Е.В.", icon: false },
  //       { ...link, class: "link no-underline hover:underline", text: "ИНН 920158336626", icon: false },
  //       "ИНН 920158336626",
  //     ],
  //   },

  // ],
};
