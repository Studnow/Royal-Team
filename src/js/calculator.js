window.addEventListener("scroll", () => {
  const calculator = document.getElementById("calculator-widget");
  if (window.scrollY > 100) {
    // Скрывать после 100px скролла (или высота hero / 2)
    calculator.classList.add("opacity-0", "pointer-events-none");
    calculator.classList.remove("opacity-100");
  } else {
    calculator.classList.remove("opacity-0", "pointer-events-none");
    calculator.classList.add("opacity-100");
  }
});
