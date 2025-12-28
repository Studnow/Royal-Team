// utils/splitTemplate.js
import cloneDeep from "lodash.clonedeep";

// Ключи, относящиеся к контенту (только текстовые и идентификаторы)
const CONTENT_KEYS = new Set([
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

/**
 * Рекурсивно разделяет объект на контент и стили
 * @param {object|array} obj — объект или массив секции
 * @returns {{content: object|array, styles: object|array}}
 */
function splitObject(obj) {
  if (Array.isArray(obj)) {
    const contentArray = [];
    const stylesArray = [];

    for (const item of obj) {
      if (item && typeof item === "object") {
        const { content: itemContent, styles: itemStyles } = splitObject(item);
        contentArray.push(itemContent);
        stylesArray.push(itemStyles);
      } else {
        // Примитивы: текст/число в контент, остальное в стили
        if (typeof item === "string" || typeof item === "number") {
          contentArray.push(item);
        } else {
          stylesArray.push(item);
        }
      }
    }

    return {
      content: contentArray.length ? contentArray : [],
      styles: stylesArray.length ? stylesArray : [],
    };
  }

  if (!obj || typeof obj !== "object") {
    return { content: obj, styles: {} };
  }

  const content = {};
  const styles = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object") {
      // Рекурсивно обрабатываем вложенные объекты
      const { content: nestedContent, styles: nestedStyles } = splitObject(value);

      if (Array.isArray(nestedContent) ? nestedContent.length > 0 : Object.keys(nestedContent).length > 0) {
        content[key] = nestedContent;
      }

      if (Array.isArray(nestedStyles) ? nestedStyles.length > 0 : Object.keys(nestedStyles).length > 0) {
        styles[key] = nestedStyles;
      }
    } else {
      // Примитивные значения: распределяем по ключу
      if (CONTENT_KEYS.has(key)) {
        content[key] = value;
      } else {
        styles[key] = value;
      }
    }
  }

  return { content, styles };
}

/**
 * Объединяет стили с контентом, используя стили как шаблон для заполнения
 * @param {object|array} content — объект контента
 * @param {object|array} styles — объект стилей
 * @returns {object|array} — контент со стилями
 */
function mergeContentWithStyles(content, styles) {
  if (Array.isArray(content) && Array.isArray(styles)) {
    // Если у нас есть массив контента и стилей
    if (styles.length === 1 && content.length > 1) {
      // Один стиль для всех элементов контента - дублируем стиль
      const commonStyle = styles[0];
      return content.map((item) => mergeContentWithStyles(item, commonStyle));
    } else if (styles.length >= content.length) {
      // Стилей достаточно для каждого элемента
      return content.map((item, index) => mergeContentWithStyles(item, styles[index] || {}));
    } else {
      // Стилей меньше чем контента - используем последний стиль для остальных
      return content.map((item, index) =>
        mergeContentWithStyles(item, styles[index] || styles[styles.length - 1] || {})
      );
    }
  }

  if (Array.isArray(content) && !Array.isArray(styles)) {
    // Массив контента, объект стилей - применяем стили ко всем элементам
    return content.map((item) => mergeContentWithStyles(item, styles));
  }

  if (!Array.isArray(content) && Array.isArray(styles)) {
    // Объект контента, массив стилей - берем первый стиль
    return mergeContentWithStyles(content, styles[0] || {});
  }

  // Оба объекты
  if (!content || typeof content !== "object") {
    return content;
  }

  if (!styles || typeof styles !== "object") {
    return content;
  }

  const result = cloneDeep(content);

  // Сначала добавляем все стили верхнего уровня
  for (const [key, value] of Object.entries(styles)) {
    if (!CONTENT_KEYS.has(key) && typeof value !== "object") {
      result[key] = value;
    }
  }

  // Затем обрабатываем вложенные объекты
  for (const [key, contentValue] of Object.entries(content)) {
    const styleValue = styles[key];
    if (styleValue && typeof contentValue === "object") {
      result[key] = mergeContentWithStyles(contentValue, styleValue);
    }
  }

  // Добавляем стили, которых нет в контенте
  for (const [key, styleValue] of Object.entries(styles)) {
    if (!result.hasOwnProperty(key) && typeof styleValue === "object") {
      result[key] = cloneDeep(styleValue);
    }
  }

  return result;
}

/**
 * Находит и удаляет дублирующиеся объекты стилей в массивах
 * @param {object|array} styles — объект стилей
 * @returns {object|array} — стили без дубликатов
 */
function deduplicateStyles(styles) {
  if (Array.isArray(styles)) {
    const seen = new Map();
    const result = [];

    for (const item of styles) {
      const key = JSON.stringify(item);
      if (!seen.has(key)) {
        seen.set(key, true);
        result.push(Array.isArray(item) || (item && typeof item === "object") ? deduplicateStyles(item) : item);
      }
    }

    return result;
  }

  if (styles && typeof styles === "object") {
    const result = {};
    for (const [key, value] of Object.entries(styles)) {
      result[key] = deduplicateStyles(value);
    }
    return result;
  }

  return styles;
}

/**
 * Разделяет схему секции на контент и стили с удалением дублирующихся стилей
 * Стили заполняют все объекты компонентов, но сами не дублируются
 * @param {object} obj — объект секции из sectionsMap
 * @returns {{content: object, styles: object, contentWithStyles: object}}
 */
export function splitTemplateData(obj) {
  // Работаем на копии, не мутируем исходник
  const objCopy = cloneDeep(obj);

  // Разделяем на контент и стили
  const { content, styles } = splitObject(objCopy);

  // Удаляем дублирующиеся стили
  const deduplicatedStyles = deduplicateStyles(styles);

  // Объединяем контент со стилями
  const contentWithStyles = mergeContentWithStyles(content, deduplicatedStyles);

  return {
    content,
    styles: deduplicatedStyles,
    contentWithStyles,
  };
}

/**
 * Вспомогательная функция для подсчета количества объектов в структуре
 * @param {object|array} obj — объект для подсчета
 * @returns {number} — количество объектов
 */
function countObjects(obj) {
  if (Array.isArray(obj)) {
    return obj.reduce((sum, item) => sum + countObjects(item), 0);
  }
  if (obj && typeof obj === "object") {
    return 1 + Object.values(obj).reduce((sum, value) => sum + countObjects(value), 0);
  }
  return 0;
}

/**
 * Вспомогательная функция для получения статистики оптимизации
 * @param {object} originalObj — исходный объект
 * @returns {object} — статистика
 */
export function getOptimizationStats(originalObj) {
  const original = cloneDeep(originalObj);
  const { styles: originalStyles } = splitObject(original);
  const optimizedStyles = deduplicateStyles(originalStyles);

  const originalCount = countObjects(originalStyles);
  const optimizedCount = countObjects(optimizedStyles);

  return {
    originalStyleObjects: originalCount,
    optimizedStyleObjects: optimizedCount,
    duplicatesRemoved: originalCount - optimizedCount,
    compressionRatio: optimizedCount / originalCount,
  };
}
