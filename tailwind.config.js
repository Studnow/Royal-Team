import { defineConfig } from 'vite';
import daisyui from 'daisyui';
import mytheme from './src/config/themes/daisyui.js';

export default defineConfig({
  content: [
    "./index.html",
    "./src/{**/*,partials/**/*}.{html,js,ts,jsx,tsx,css}",
    // "./template-parts/**/*.{php,html}",
    // "./inc/**/*.php",

    //old
    // "./index.html",
    // "./src/partials/**/*.html",
    // "src/sass/*.sass",
    // "./*.php",
    // "./template-parts/*.php",
    // "./template-parts/**/*.php",
    // "./inc/*.php",
    // "./src/**/*.css",
    // "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        // Первое - размер шрифта, второе - высота строки
        "h1-clamp": ["clamp(1.8rem, 1.071rem + 2.804vw, 4.66rem)", "100%"],
        "h2-clamp": ["clamp(1.8rem, 1.581rem + 0.843vw, 2.66rem)", "clamp(2rem, 1.66rem + 1.307vw, 3.333rem)"],
        "h3-clamp": ["clamp(1rem, 0.847rem + 0.588vw, 1.6rem)", "clamp(1.33rem, 1.159rem + 0.657vw, 2rem)"],
        "h4-clamp": ["clamp(1.333rem, 1.265rem + 0.261vw, 1.6rem)", "2rem"],
        "h5-clamp": ["clamp(1rem, 0.915rem + 0.327vw, 1.333rem)", "clamp(1.33rem, 1.159rem + 0.657vw, 2rem)"],
        lead: ["38px", "52px"], // 48px 84
        body: ["clamp(0.8rem, 0.749rem + 0.196vw, 1rem)", "clamp(1rem, 0.915rem + 0.327vw, 1.333rem)"], // 36px 80 min 16/130 max 18/130
        caption: ["clamp(1.33rem, 1.159rem + 0.657vw, 2rem)", "clamp(2rem, 1.83rem + 0.654vw, 2.667rem)"],
      },
      backgroundImage: {
        hero: "url('/assets/img/compressed/hero-bg.webp')",
      },
      colors: {
        "link-active": "oklch(var(--link-active) / <alpha-value>)",
      },
    },
  },
  daisyui: {
    themes: ["corporate", "dark", mytheme],
  },
  plugins: [daisyui],
});
