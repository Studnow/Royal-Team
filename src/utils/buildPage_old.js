import merge from "lodash.merge";

/**
 * Сборка полной страницы: layout + sections
 */
export function buildPage({ pageId, pageConfig, pageData = {}, pageStyles = {}, sectionsMap = {}, layoutsMap = {} }) {
  const cfg = pageConfig[pageId];
  if (!cfg) throw new Error(`Страница "${pageId}" не найдена в pageConfig`);

  // Секции
  const sections = cfg.sections.map((item) => {
    const key = typeof item === "string" ? item : item.key;
    const base = sectionsMap[key] || {};
    const stylePage = pageStyles[key] || {};
    const contPage = pageData[key] || {};

    return merge({}, base, stylePage, contPage);
  });

  // Layout
  const layout = Object.fromEntries(
    Object.entries(cfg.layout || {})
      .filter(([_, settings]) => settings === true || typeof settings === "object")
      .map(([name, settings]) => {
        const defaultData = layoutsMap[name] || {};
        const pageBlock = pageData[name] || {};
        const pageStylesBlock = pageStyles[name] || {};
        const customOv = settings === true ? {} : settings.overrides || {};

        const data = merge({}, defaultData, pageBlock, pageStylesBlock, customOv);

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