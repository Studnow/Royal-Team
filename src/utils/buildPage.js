import merge from "lodash.merge";
import cloneDeep from "lodash.clonedeep";

/**
 * Рекурсивно применяет стили к данным (массивы и объекты), сохраняя структуру исходных данных.
 * Для массивов применяет стили по индексу: data[i] + styles[i].
 * @param {object|array} contentData - Данные контента (объект или массив).
 * @param {object|array} stylesData - Стили для применения (объект или массив).
 * @param {string} debugKey - Ключ для отладки (опционально).
 * @returns {object|array} Данные с применёнными стилями.
 */
function applyStylesToContent(contentData, stylesData, baseData = [], debugKey = "") {
  if (Array.isArray(contentData)) {

    return contentData.map((item, index) => {
      // выбираем нужный styleToApply по индексу или объект-стиль
      const rawStyle = Array.isArray(stylesData) ? stylesData[index] || stylesData[0] || {} : stylesData || {};
      // очищаем поля, которые не хотим затирать на корне (если нужно)
      const { type: _t, template: _tpl, ...styleToApply } = rawStyle;
      const baseComponent = Array.isArray(baseData) ? baseData[index] || {} : {};
      // всегда мёржим даже «уже стилизованные» items
      const merged = merge({}, cloneDeep(baseComponent), cloneDeep(styleToApply), cloneDeep(item));

      // рекурсивно обрабатываем вложенные объекты (например, icon, button и т. д.)
      for (const [key, value] of Object.entries(merged)) {
        if (value && typeof value === "object") {
          // берём nestedStyle так же по index или по объекту
          const nestedRaw = Array.isArray(styleToApply[key]) ? styleToApply[key][index] || {} : styleToApply[key] || {};
          merged[key] = applyStylesToContent(value, nestedRaw, `${debugKey}.${key}`);
        }
      }

      return merged;
    });
  }
  if (contentData && typeof contentData === "object" && !Array.isArray(contentData)) {
    const result = cloneDeep(contentData);
    for (const [key, value] of Object.entries(contentData)) {
      if (value && typeof value === "object") {
        const styleForKey = (stylesData && stylesData[key]) || {};
        result[key] = applyStylesToContent(value, styleForKey, `${debugKey}.${key}`);
      }
    }
    return result;
  }
  return contentData;
}

/**
 * Проверяет, является ли объект "сырым" (без стилевых ключей).
 * @param {object} obj - Проверяемый объект.
 * @returns {boolean} Является ли объект сырым.
 */
function isRawContentObject(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;

  const contentKeys = new Set([
    "text",
    "title",
    "description",
    "caption",
    "label",
    "alt",
    "url",
    "name",
    "ext",
    "id",
    "src",
  ]);
  const styleKeys = new Set([
    "type",
    "class",
    "cardClass",
    "btnType",
    "modern",
    "isLink",
    "modal",
    "classTitle",
    "classDesc",
    "textClass",
    "cardFigureClass",
    "cardBodyClass",
    "cardPicture",
    "cardActions",
    "fullWidth",
    "width",
    "height",
  ]);

  const objKeys = Object.keys(obj);

  // Если есть хотя бы один стилевой ключ на верхнем уровне - это не сырой объект
  const hasTopLevelStyleKeys = objKeys.some((key) => styleKeys.has(key));
  if (hasTopLevelStyleKeys) {
    return false;
  }

  // Проверяем, что это объект слайда без стилей
  const slideContentKeys = new Set([
    "cardHeading",
    "picture",
    "button",
    "text",
    "title",
    "description",
    "caption",
    "label",
    "alt",
    "url",
    "name",
    "ext",
    "id",
    "src",
  ]);

  // Если все ключи верхнего уровня являются либо примитивным контентом, либо структурами контента
  const isSlideContent = objKeys.every((key) => {
    const value = obj[key];
    // Примитивные значения контента
    if (typeof value !== "object") {
      return contentKeys.has(key) || slideContentKeys.has(key);
    }
    // Объекты контента (например, cardHeading, picture, button)
    return slideContentKeys.has(key);
  });

  return isSlideContent;
}

/**
 * Умный мерж: объединяет base, styles и content, сохраняя базовые свойства.
 * Для массивов применяет стили по индексу.
 * @param {object} base - Базовый объект.
 * @param {object} styles - Объект стилей.
 * @param {object} content - Объект контента.
 * @returns {object} Результат объединения.
 */

function smartMerge(base, styles, content) {
  // ИСПРАВЛЕНО: Начинаем с базы и сразу мержим стили, чтобы сохранить все базовые свойства
  const result = merge({}, cloneDeep(base), cloneDeep(styles));

  // Теперь обрабатываем контент
  for (const [key, value] of Object.entries(content)) {
    if (Array.isArray(value)) {
      // Для массивов ищем соответствующие стили
      let stylesForArray = null;

      // Сначала проверяем есть ли стили в result[key] (уже смерженном)
      if (result[key] && Array.isArray(result[key])) {
        stylesForArray = result[key];
      }
      // Затем проверяем в styles[key]
      else if (styles[key]) {
        stylesForArray = styles[key];
      }
      // Затем в base[key]
      else if (base[key]) {
        stylesForArray = base[key];
      }

      // Для slideData используем первый элемент массива стилей как шаблон
      if (key === "slideData" && stylesForArray && Array.isArray(stylesForArray) && stylesForArray.length > 0) {
        console.log("ОТЛАДКА: Найден массив стилей для slideData, используем первый элемент как шаблон");
        stylesForArray = stylesForArray[0];
      }

      // Передаём сюда и массив базовых элементов:
      const baseForArray = Array.isArray(base[key]) ? base[key] : [];
      result[key] = applyStylesToContent(
        value, // контент из pageData
        stylesForArray, // стили из pageStyles/base/styles
        baseForArray, // БАЗА из sectionsMap[key]
        key // debugKey
      );
    } else if (value && typeof value === "object") {
      // Для вложенных объектов – глубокий merge: base[key], styles[key], content[key]
      result[key] = merge({}, cloneDeep(base[key] || {}), cloneDeep(styles[key] || {}), cloneDeep(value));
    } else {
      // Примитивные значения просто перезаписываем
      result[key] = value;
    }
  }

  return result;
}

/**
 * Собирает объект страницы: layout и sections, объединяя base, styles и content.
 * @param {object} params - Параметры для сборки страницы.
 * @param {string} params.pageId - ID страницы.
 * @param {object} params.pageConfig - Конфиг страниц.
 * @param {object} [params.pageData] - Данные страницы.
 * @param {object} [params.pageStyles] - Стили страницы.
 * @param {object} [params.sectionsMap] - Карта секций.
 * @param {object} [params.layoutsMap] - Карта layout.
 * @returns {object} Итоговый объект страницы.
 */
export function buildPage({ pageId, pageConfig, pageData = {}, pageStyles = {}, sectionsMap = {}, layoutsMap = {} }) {
  const cfg = pageConfig[pageId];
  if (!cfg) throw new Error(`Страница "${pageId}" не найдена в pageConfig`);

  // Sections with smart merge
  const sections = cfg.sections
    .map((item) => {
      const key = typeof item === "string" ? item : item.key;
      const base = sectionsMap[key] || {};
      const stylePage = pageStyles[key] || {};
      const contPage = pageData[key] || {};
      const result = smartMerge(base, stylePage, contPage);
      if (!result.template && base.template) {
        result.template = base.template;
      }
      if (!result.template) {
        return null;
      }
      return result;
    })
    .filter((section) => section !== null);

  // Layout
  const layout = Object.fromEntries(
    Object.entries(cfg.layout || {})
      .filter(([_, settings]) => settings === true || typeof settings === "object")
      .map(([name, settings]) => {
        const defaultData = layoutsMap[name] || {};
        const pageBlock = pageData[name] || {};
        const pageStylesBlock = pageStyles[name] || {};
        const customOv = settings === true ? {} : settings.overrides || {};
        const data = merge({}, defaultData, pageStylesBlock, pageBlock, customOv);
        return [name, data];
      })
  );
  return {
    meta: cfg.meta,
    mainClass: "mb-4 w-full",
    layout,
    sections,
  };
}
