import picture from "../components/picture";
import rating from "../components/rating";

export default {
  template: "about",
  class:
    "about px-4 prose container mx-auto md:max-w-screen-xl mb-4 grid grid-cols-1 justify-center md:grid-cols-3 backdrop-blur-sm place-items-center",
  heading: {
    container: true,
    titleLevel: "2",
    title: "Добро пожаловать в",
    description: false,
    class: {
      container: "",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl max-w-lg xl:max-w-3xl",
    },
  },
  description: [
    "Мы рады приветствовать всех, кто ищет лучшие решения для обмена криптовалют. У нас вы можете быстро и выгодно обменять такие электронные валюты, как: Bitcoin BTC, Ethereum ETH, Tether TRC 20 USDT, a также другие валюты. Осуществить банковские переводы и при необходимости получить фиатные деньги.",
    "Зарегистрируйтесь на сайте Krabikmoney.com, чтобы получить доступ к полному спектру услуг. Вы сможете воспользоваться программой лояльности, накопительными скидками и партнерскими предложениями, что обеспечит вам лучшие условия для обмена электронных и других валют.",
  ],
  lastP:
    "Krabikmoney - это современная платформа для безопасной и удобной конвертации электронных денег. С нами вы легко сможете купить или продать необходимую вам валюту или криптовалюту. Присоединяйтесь к Krabikmoney.com прямо сейчас!",
  cardBtn: {
    isLink: false,
    isIcon: false,
    textClass: "",
    url: "#",
    text: "Зарегистрироваться",
    type: "button",
    class: "btn bg-gradient-to-r from-primary to-secondary text-base-100 shadow-gray-500 shadow-lg border-none",
    icon: { id: "logo-crab", iconClass: "", w: "22", h: "22" },
  },
  picture,
  rating,
};
