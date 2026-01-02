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
  containerClass: "footer bg-primary text-center place-items-center text-base-100 p-10",
  components: footerData.columns.map((footerNavList) => ({
...nav,
      type: "list-nav",
      title: footerNavList.title,
      class: "text-base-100",
      listItems: footerNavList.items.map((item) => ({...link, class: link.class + " text-base-100 no-underline", text:item, icon: false}))
  })) 
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
