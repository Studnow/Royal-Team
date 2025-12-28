import modalForm from "../components/dynForm";
export default {
  template: "modal",
  id: 'my_modal_1',
  class: "mb-4 px-6 mx-auto",
  heading: {
    container: true,
    titleLevel: 3,
    title: "Hello modalk",
    description: "Press ESC or button to close this window",
    class: { containerClass: "", title: "", description: "" },
  },
  body: { form: true, modalForm },
  footer: "",
};
