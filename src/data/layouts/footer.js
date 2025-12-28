import logo from "../components/logo";
import icon from "../components/icon";
import link from "../components/link";
import { socialLink } from "../components/link";
//lists
import list from "../components/list";

const nav = list;
const social = list;
const policy = list;

export default {
  template: "footer",
  containerClass: "footer bg-primary text-center place-items-center text-base-100 p-10",
  components: [
    { ...logo, containerClass: "link", text: "", icon: false },
    {
      ...nav,
      type: "list-nav",
      title: false,
      class: "",
      listItems: [
        { ...link, class: "link no-underline hover:underline", text: "ИП Твердохлеб Е.В.", icon: false },
        { ...link, class: "link no-underline hover:underline", text: "ИНН 920158336626", icon: false },
        "ИНН 920158336626",
      ],
    },
    {
      ...social,
      type: "list",
      title: false,
      sub: false,
      class: "flex flex-col items-center",
      listClass: "flex flex-row flex-wrap lg:flex-nowrap justify-between items-center gap-2",
      listItems: [
        { ...socialLink, icon: { ...socialLink.icon, id: "yt" } },
        { ...socialLink, icon: { ...socialLink.icon, id: "vk" } },
        { ...socialLink, icon: { ...socialLink.icon, id: "instagram" } },
        { ...socialLink, icon: { ...socialLink.icon, id: "fb" } },
        { ...socialLink, icon: { ...socialLink.icon, id: "tg" } },
        { ...socialLink, icon: { ...socialLink.icon, id: "ok" } },
      ],
    },
    {
      ...policy,
      type: "list-nav",
      title: false,
      class: "flex flex-col items-center",
      listClass: "flex flex-row justify-between items-center gap-4",
      listItems: [
        {
          ...link,
          url: "/privacy-policy",
          text: "Политика конфиденциальности",
          class: "link no-underline hover:underline mb-4",
          icon: false,
        },
        {
          ...link,
          url: "/copyright",
          text: "Copyright (c) 2025",
          class: "link no-underline hover:underline mb-4",
          icon: false,
        },
      ],
    },
  ],
};
