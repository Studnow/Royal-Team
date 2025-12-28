import "./main.css";
import "@splidejs/splide/css";
// import "./sass/header.sass";

// import "./js/counter"
import Splide from "@splidejs/splide";

const heroSlider = new Splide("#main-slider", {
  arrows: true,
  // perPage: 2,
  pagination: true,
  classes: {
    pagination: "splide__pagination main-pagination",
    page: "splide__pagination__page main-page",
  },
  breakpoints: {
    1024: {
      perPage: 1,
    },
  },
  gap: "2rem",
});

heroSlider.on("mounted move", function () {
  const currentIndex = heroSlider.index;
  const pages = document.querySelectorAll(".splide__pagination__page");

  pages.forEach((page, index) => {
    const texts = ["Раковины и мойки", "Столешницы", "Тумбы", "Барные стойки", "Фасадный декор"];
    const number = String(index + 1).padStart(2, "0");
    page.setAttribute("data-text", texts[index]);
    page.setAttribute("data-number", number);
    // Показываем только активную и по 2 соседние
    const isVisible = Math.abs(index - currentIndex) <= 4;
    page.style.display = isVisible ? "block" : "none";
  });
});
heroSlider.on("mounted", function () {
  const pages = document.querySelectorAll(".splide__pagination__page");
  console.log("pages count:", pages.length);
  const pagination = document.querySelector(".splide__pagination");
  const texts = ["Раковины", "Смесители", "Ванны", "Душевые", "Раковины", "Смесители", "Ванны", "Душевые"];

  // Устанавливаем атрибуты с текстом И номером
  pages.forEach((page, index) => {
    const number = String(index + 1).padStart(2, "0");
    page.setAttribute("data-text", texts[index]);
    page.setAttribute("data-number", number);
  });

  // Проверяем количество слайдов
  if (pages.length > 5) {
    pagination.classList.add("many-slides");
  }

  setTimeout(() => {
    if (pagination.scrollWidth > pagination.clientWidth) {
      pagination.classList.add("many-slides");
    }
  }, 100);
});
heroSlider.mount();

// document.querySelectorAll("nav a").forEach((link) => {
//   if (link.href === window.location.href) {
//     link.classList.add("active");
//   }
// });
// document.addEventListener("load", (e) => {
//   console.log(heroBg);
// });

// Range function

// const _R = document.querySelectorAll("[type=range]"),
//   _W = _R.parentNode,
//   _O = _R.nextElementSibling;

// document.documentElement.classList.add("js");
// document.documentElement.classList.add("js");

// for (let i = 0; i < _R.length; i++) {
//   _R[i].addEventListener(
//     "input",
//     (e) => {
//       if (e.target.id == "money-range") {
//         e.currentTarget.style.setProperty("--val", +e.currentTarget.value);
//         e.currentTarget.nextElementSibling.value =
//           (e.currentTarget.value * 1000).toString().slice(0, 2) +
//           " " +
//           (e.currentTarget.value * 1000).toString().slice(2, 5) +
//           " ₮";
//         e.currentTarget.parentNode.style.setProperty("--val", +e.currentTarget.value);
//       }
//       if (e.target.id == "term-range") {
//         e.currentTarget.style.setProperty("--val", +e.currentTarget.value);
//         e.currentTarget.nextElementSibling.value = e.currentTarget.value + " дней";
//         e.currentTarget.parentNode.style.setProperty("--val", +e.currentTarget.value);
//       }
//     },
//     false
//   );
// }
// for (let i = 0; i < _R.length; i++) {
//   _R[i].addEventListener(
//     "input",
//     (e) => {
//       if (e.target.id == "money-range") {
//         e.currentTarget.style.setProperty("--val", +e.currentTarget.value);
//         e.currentTarget.nextElementSibling.value =
//           (e.currentTarget.value * 1000).toString().slice(0, 2) +
//           " " +
//           (e.currentTarget.value * 1000).toString().slice(2, 5) +
//           " ₮";
//         e.currentTarget.parentNode.style.setProperty("--val", +e.currentTarget.value);
//       }
//       if (e.target.id == "term-range") {
//         e.currentTarget.style.setProperty("--val", +e.currentTarget.value);
//         e.currentTarget.nextElementSibling.value = e.currentTarget.value + " дней";
//         e.currentTarget.parentNode.style.setProperty("--val", +e.currentTarget.value);
//       }
//     },
//     false
//   );
// }

// _R.addEventListener(
//   "input",
//   (e) => {
//     _R.style.setProperty("--val", +_R.value);
//     _O.value = Number(_R.value) * 1000;
//     _W.style.setProperty("--val", +_R.value);
//   },
//   false
// );
