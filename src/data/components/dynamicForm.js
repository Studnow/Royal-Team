import button from './button.js';
import rating from './rating.js';
import field from './formParts/field.js';
import select from './formParts/select.js';
import textarea from './formParts/textarea.js';

// prepare rating props so each radio uses the ratingName as input name
const ratingProps = Object.assign({}, rating, { ratingName: 'contact_rating', ratings: rating.ratings.map(r => Object.assign({}, r, { name: 'contact_rating' })) });

export default {
  type: 'dynamicForm',
  id: 'contactForm',
  action: '/send-contact',
  method: 'post',
  formClass: 'col-span-12 gap-4 flex flex-col md:flex-row lg:w-[55%] mb-4 flex-wrap',

  /*
    fields: array of field descriptors. Each descriptor supports:
      - type: 'text' | 'email' | 'tel' | 'number' | 'password' | 'textarea' | 'select' | ...
      - name, label, placeholder, required, value
      - rows (for textarea)
      - options (for select): array of strings or { value, label, selected }
      - partial: name of a partial to render (e.g. 'button', 'rating') - the field object will be passed as context
      - class/inputClass/textareaClass/selectClass, help, group
  */
  fields: [
    [
      Object.assign({}, field, { type: 'text', name: 'name', label: 'Имя', placeholder: 'Ваше имя', required: true, class: 'w-full md:w-1/2', wrapLabel: true, inputClass: '' , group: 'main' }),
      Object.assign({}, field, { type: 'tel', name: 'phone', label: 'Телефон', placeholder: '+7 (___) ___-__-__', class: 'w-full md:w-1/2', wrapLabel: true, inputClass: '', group: 'main' })
    ],

    Object.assign({}, field, { type: 'email', name: 'email', label: 'Email', placeholder: 'you@example.com', class: 'w-full', wrapLabel: true, inputClass: '', group: 'main' }),

    Object.assign({}, textarea, { name: 'message', label: 'Сообщение', placeholder: 'Опишите ваш запрос', rows: 4, class: 'w-full', textareaClass: '', group: 'main' }),

    Object.assign({}, select, { name: 'service', label: 'Услуга', placeholder: 'Выберите услугу', options: [
      { value: 'consult', label: 'Консультация' },
      { value: 'repair', label: 'Ремонт' },
      { value: 'install', label: 'Установка' }
    ], class: 'w-full md:w-1/2', selectClass: '', group: 'meta' }),

    Object.assign({}, field, { type: 'number', name: 'guests', label: 'Кол-во гостей', placeholder: '2', value: '1', class: 'w-full md:w-1/2', group: 'meta' }),

  /* rating rendered via partial - pass full rating object with overridden name */
  { partial: 'rating', name: 'rating', label: 'Оцените сервис', help: '0-5', class: 'w-full', group: 'meta', props: ratingProps },

  /* button rendered via partial; create a props object so the partial receives expected keys */
  { partial: 'button', name: 'submit', class: 'w-full md:w-auto', props: Object.assign({}, button, { text: 'Отправить', btnType: 'submit', class: 'btn btn-primary' }) }
  ]
};
