export const heading = {
  type: "section-title",
  container: true,
  titleLevel: "2",
  title: "Секция карточек",
  caption: false,
  captionText: "Это секция с карточками",
  captionClass: "text-caption text-secondary mb-4",
  description: false,
  containerClass: "",
  titleClass: "mb-12 text-h2-clamp",
  descriptionClass: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl",
};

export const headingHero = {
    ...heading,
    container: true,
    containerClass: "max-w-full lg:max-w-screen-sm lg:mb-6",
    titleLevel: "2",
    titleClass: "text-h2-clamp mb-2 lg:mb-8 text-primary",
    descriptionClass:
      "text-subtitle text-neutral font-bold md:w-2/3 flex-grow-0",
  };

export const headingSlideCard = {
  ...heading,
  container: false, // card не имеет условия для контейнера
  containerClass: "self-center",
  titleLevel: "2",
  titleClass: "text-h2-clamp mb-2",
  descriptionClass: "text-subtitle font-bold md:w-2/3 flex-grow-0",
};

export default heading;