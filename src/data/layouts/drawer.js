import accordion from "../components/accordion";
export default {
  template: "drawer",
  tabName: "my_tabs",
  tabs: [
    { tabLabel: "Tab 1", checked: "", content: "Tab content 1" },
    { tabLabel: "Tab 2", checked: "checked", content: "Tab content 2" },
    { tabLabel: "Tab 3", checked: "", content: "Tab content 3" },
    { tabLabel: "Tab 4", checked: "", content: "Tab content 4" },
  ],
  accordion
};
