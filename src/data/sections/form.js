import dynForm from "../components/dynForm";
import list from "../components/list";
export default {
  template: "form",
  heading: {
    container: true,
    titleLevel: "2",
    title: "Секция формы",
    description: false,
    class: {
      containerClass: "",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl",
    },
  },
  list,
  dynForm
};
