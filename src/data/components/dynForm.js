import button from './button.js';
import rating from './rating.js';

export default {
  type: "dForm",
  id: "feedback",
  action: "",
  method: "", // get, post, dialog (for close dialog, not submit)
  formClass: "col-span-12 gap-4 flex flex-col md:flex-row lg:w-[55%] mb-4 flex-wrap",
  controlClass: "",
  fields: {
    Email: false,
    Name: true,
    Phone: true,
    button: true,
    check: false,
    radio: false,
    select: false,
    file: false,
    range: false,
    rating: false,
    textField: true,
    textArea: true,
    toggle: true,
  },
  placeholder: {
    name: "Имя",
    phone: "Номер телефона",
  },
  rating,
  button,
};
