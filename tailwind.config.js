/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        green: {
          500: "rgb(89 191 126)",
        },
      },
    },
    screens: {
      sm: defaultTheme.screens.sm,
      xs: defaultTheme.screens.xs,
    },
  },
  plugins: [],
};
