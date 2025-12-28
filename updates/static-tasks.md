## План интеграции наработок в основной бойлерплейт

Ниже описан поэтапный план реализации твоих текущих целей по улучшению бойлерплейта. Для каждого пункта указаны ключевые шаги и примерная структура файлов.

---

### 1. Обёртка секций по типу "слотов" Vue

**Задача:** Реализовать универсальную обёртку `<Section>` с поддержкой именованных слотов (header, content, footer и т. д.), чтобы сократить количество отдельных шаблонов.

**Шаги реализации:**

1. Создать частичный шаблон `section.hbs`:

   ```hbs
   {{!-- section.hbs --}}
   <section class="section {{sectionClass}}">
     {{#if header}}
       <div class="section__header">
         {{{header}}}
       </div>
     {{/if}}
     <div class="section__content">
       {{{content}}}
     </div>
     {{#if footer}}
       <div class="section__footer">
         {{{footer}}}
       </div>
     {{/if}}
   </section>
   ```
2. В helper-функции (например, `registerHelpers.js`) добавить функцию `renderSection(context)` для подготовки и рендеринга слотов:

   ```js
   hbs.registerHelper('renderSection', function(name, options) {
     const slots = this.sections?.[name] || {};
     return new hbs.SafeString(
       hbs.partials['section']({
         sectionClass: slots.class || '',
         header:   slots.header  || '',
         content:  slots.content || options.fn(this),
         footer:   slots.footer  || ''
       })
     );
   });
   ```
3. В глобальном контексте (например, `context.js`) хранить структуру секций для разных страниц:

   ```js
   module.exports = {
     sections: {
       hero: {
         class: 'hero',
         header: '<h1>...',
         content: '<p>...',
       },
       features: {
         class: 'features',
         content: '<div class="feature-list">...',
       }
     }
   };
   ```
4. Использование в шаблоне страницы:

   ```hbs
   {{#renderSection 'hero'}}
     <!-- по умолчанию контент -->
   {{/renderSection}}
   ```

---

### 2. Базовые данные для компонентов (JS-контекст)

**Задача:** Вынести все «статические» данные (тексты, иконки, пути) в единый модуль, чтобы компоненты получали готовый объект и не повторяли логику.

**Шаги реализации:**

1. Создать файл `data/components.js`:

   ```js
   module.exports = {
     buttons: {
       primary:  { text: 'Подробнее', icon: 'arrow-right' },
       secondary:{ text: 'Отмена',   icon: 'close' }
     },
     cards: [
       { title: 'Услуга 1', img: 'service1.jpg' },
       { title: 'Услуга 2', img: 'service2.jpg' }
     ],
     // ...
   };
   ```
2. В `context.js` импортировать и объединить данные:

   ```js
   const componentData = require('./data/components');

   module.exports = {
     ...componentData,
     // другие глобальные значения
   };
   ```
3. В HBS-шаблонах обращаться напрямую к данным:

   ```hbs
   {{#each cards}}
     <Card title="{{this.title}}" image="{{this.img}}" />
   {{/each}}
   ```

---

### 3. Преобразование Figma-JSON в JS-модель без ключей

**Задача:** Исходный массив строк без меток распределить по секциям и полям на основе заранее заданной структуры (шаблона секций и полей).

#### 3.1. Конфиг структуры

В `data/figmaStructure.js` опиши секции, их порядок и поля (названия полей), например:

```js
module.exports = [
  {
    name:      'offers',    // имя секции
    length:     4,          // сколько строк соответствует секции
    fields:    ['title1','title2','title3','title4']
  },
  {
    name:      'services',
    length:     1,
    fields:    ['servicesList']
  },
  {
    name:      'footerCTA',
    length:     1,
    fields:    ['ctaText']
  }
];
```

#### 3.2. Скрипт `scripts/parseFigma.js`

```js
const fs         = require('fs');
const structure  = require('../data/figmaStructure');
const rawArr     = require('../data/figma.json');

let index = 0;
const result = {};

for (const section of structure) {
  const { name, length, fields } = section;
  const slice = rawArr.slice(index, index + length);
  index += length;

  if (fields.length === 1) {
    // всё в одно поле (например, массив строк или конкатенация)
    result[name] = slice.length > 1 ? slice : slice[0];
  } else {
    // распределяем по именованным полям
    result[name] = {};
    fields.forEach((field, i) => {
      result[name][field] = slice[i] || '';
    });
  }
}

// Записываем
fs.writeFileSync(
  './data/figmaSections.js',
  'module.exports = ' + JSON.stringify(result, null, 2) + ';'
);
```

#### 3.3. Результат `data/figmaSections.js`

```js
module.exports = {
  offers: {
    title1: "-25% на подбор краски при покраске автомобиля",
    title2: "Счастливые часы -5% с 8:00 до 13:00",
    title3: "Скидка в День рождение -20%",
    title4: "-10% на полировку кузова по четвергам"
  },
  services: {
    servicesList: "Кузовной ремонт"
  },
  footerCTA: {
    ctaText: "Удобнее написать?"
  }
};
```

---

### 4. Компонент сплайдера

**Статус:** Готово, разделён на `splide-slider`, `arrows`, `pagination`, `card`, принимает контекст.

**Рекомендация:**

* Провести рефакторинг настроек в глобальный конфиг (как в п.1).
* Убедиться, что передача данных инициализируется один раз для всех слайдеров на странице.

---

### 5. Упрощённый адаптив через базовые классы Tailwind

**Задача:** Минимизировать количество кастомных классов, используя встроенные утилиты Tailwind (`container`, `mx-auto`, `px-{n}`).

**Шаги реализации:**

1. Добавить CSS-класс `.section` в global CSS:

   ```css
   .section {
     @apply container mx-auto px-4 lg:px-8;
   }
   ```
2. В HBS-шаблонах оборачивать секции просто:

   ```hbs
   <div class="section">
     {{{content}}}
   </div>
   ```
3. При необходимости дополнять уникальные точки перелома через встроенные классы Tailwind.

---

## Итоговая структура файлов

```
├── scripts/
│   └── parseFigma.js
├── data/
│   ├── components.js
│   └── figmaSections.js
├── partials/
│   ├── section.hbs
│   └── slider.hbs
├── helpers/
│   └── registerHelpers.js
└── context.js
```

После переноса всех изменений запустим повторный тест по тому же макету и сверим полученные цифры с целевыми 7–12 ч.
