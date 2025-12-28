/**
 * @fileoverview Документация для модулей стилей в папке defaultStyles
 * Этот файл содержит полную JSDoc документацию для всех конфигурационных модулей стилей
 */

/**
 * @module defaultStyles/body
 * @description Модуль для конфигурации стилей body элемента
 * 
 * @example
 * import body from './body.js';
 * 
 * @exports {Object} - Объект с конфигурацией стилей для body элемента
 * 
 * @property {string} bodyClass - CSS класс для стилизации body элемента
 * @property {string} bodyWrapperClass - CSS класс для обертки body
 * @property {Object} bodyStyles - Объект с inline стилями для body
 */

/**
 * @module defaultStyles/footer
 * @description Модуль для конфигурации стилей footer компонента
 * 
 * @example
 * import footer from './footer.js';
 * 
 * @exports {Object} - Объект с конфигурацией стилей для footer
 * 
 * @property {string} footerClass - CSS класс для footer контейнера
 * @property {string} footerContentClass - CSS класс для содержимого footer
 * @property {string} footerLinksClass - CSS класс для links в footer
 * @property {Object} footerStyles - Объект с inline стилями для footer
 */

/**
 * @module defaultStyles/sectionStyle
 * @description Модуль с предустановками стилей для различных типов секций
 * Предоставляет несколько вариантов layout и стилизации для section элементов
 * 
 * @example
 * import { sectionStyles } from './sectionStyle.js';
 * // Использование стиля default
 * const defaultStyle = sectionStyles.default;
 * 
 * @example
 * import sectionStyle from './sectionStyle.js';
 * // Использование default экспорта для обратной совместимости
 * const style = sectionStyle;
 * 
 * @exports {Object} sectionStyles - Объект с предустановками стилей секций
 * 
 * @typedef {Object} SectionStylePreset
 * @property {string} sectionClass - CSS класс для основного контейнера секции
 * @property {string} sectionFullWidthClass - CSS класс для full-width контейнера
 * @property {string} sectionContentClass - CSS класс для grid контейнера содержимого
 * @property {string} sectionFooterClass - CSS класс для footer части секции
 * 
 * @property {SectionStylePreset} default - Стиль по умолчанию
 *   - Flex контейнер, выровненный по центру
 *   - Содержимое в grid 1-12 колонок в зависимости от экрана
 *   - Responsive контейнер с overflow hidden
 * 
 * @property {SectionStylePreset} narrow - Узкий стиль
 *   - Максимальная ширина 4xl
 *   - Grid 1-8 колонок
 *   - Меньший gap между элементами (4 вместо 6)
 * 
 * @property {SectionStylePreset} wide - Широкий стиль
 *   - Full width без ограничений
 *   - Grid 1-12 колонок
 *   - Больший gap между элементами (8)
 *   - items-stretch для растяжения элементов
 * 
 * @property {SectionStylePreset} centered - Центрированный стиль
 *   - Text-center выравнивание
 *   - Максимальная ширина 2xl для содержимого
 *   - Дополнительный margin-top на footer (mt-6)
 */
