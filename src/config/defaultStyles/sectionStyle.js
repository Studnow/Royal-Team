// old variant

// export default {
//   sectionClass: "flex flex-col items-center justify-center responsive-container",
//   sectionContentClass: "grid grid-cols-1 md:grid-cols-12 gap-6 place-items-center",
//   sectionFooterClass: "",
// };

export const sectionStyles = {
  default: {
    sectionClass: "flex flex-col items-center responsive-container overflow-hidden",
    sectionFullWidthClass: "responsive-container",
    ContentWrapper: true,
    sectionContentClass: "grid grid-cols-1 md:grid-cols-12 gap-6 place-items-center flex-grow",
    sectionFooterClass: "",
  },
  flexContent: {
    sectionClass: "flex flex-col items-center overflow-hidden",
    sectionFullWidthClass: "responsive-container",
    sectionContentClass: "flex place-items-center xl:justify-between",
    sectionFooterClass: "",
  },
  narrow: {
    sectionClass: "flex flex-col max-w-4xl overflow-hidden",
    sectionFullWidthClass: "responsive-container",
    sectionContentClass: "grid grid-cols-1 md:grid-cols-8 gap-4 place-items-center flex-grow",
    sectionFooterClass: "",
  },
  wide: {
    sectionClass: "flex flex-col items-center justify-center max-w-full",
    sectionFullWidthClass: "w-full mx-auto",
    sectionContentClass: "w-full grid grid-cols-1 md:grid-cols-12 gap-6 place-items-center",
    sectionContentCardsClass: "w-full grid grid-cols-2 xl:grid-cols-12 gap-6 place-items-start", // project dependent
    sectionFooterClass: "",
  },
  centered: {
    sectionClass: "flex flex-col items-center responsive-container text-center overflow-hidden",
    sectionFullWidthClass: "responsive-container",
    sectionContentClass: "grid grid-cols-1 max-w-2xl place-items-center flex-grow",
    sectionFooterClass: "mt-6",
  },
  heroTwoColumns: {
    sectionClass: "hero min-h-[90vh] bg-hero",
    sectionFullWidthClass: "hero-content",
    sectionContentClass: "hero-content container",
    sectionFooterClass: "mt-6",
  },
};

// Экспортируем default вариант как дефолтный для обратной совместимости
export default sectionStyles.default;