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
        "h1-clamp": ["clamp(2.375rem, 1.417rem + 4.79vw, 5.25rem)", "clamp(3.25rem, 2.5rem + 3vw, 6rem)"],
        "h2-clamp": ["clamp(1.5rem, 1.167rem + 1.481vw, 2.5rem)", "100%"],
        "h3-clamp": ["clamp(1.25rem, 1.083rem + 0.741vw, 1.75rem)", "100%"],
        lead: ["38px", "52px"], // 48px 84
        body: ["clamp(1rem, 0.958rem + 0.185vw, 1.125rem)", "130%"], // 36px 80 min 16/130 max 18/130
        caption: ["clamp(.75rem, 0.958rem + 0.185vw, 1.125rem)", "100%"],
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
