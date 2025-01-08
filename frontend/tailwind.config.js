/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "1026px", xl: "1440px" },
    extend: {
      colors: {
        lightBlue: "#D9EDBF",
        mediumBlue: "#9FACE1",
        darkBlue: "#5168C4",
        greens: "#004F52",
        oranges: "#FFD05B",
        lightOrange: "#FF914D",
        mediumOrange: "#FF9800",
        lightBg: "#FEFAF6",
      },
      backgroundImage: {
        main: "url('../image/main2.jpg')",
      },
      size: {
        45: "45rem",
        35: "35rem",
        25: "25rem",
        15: "15rem",
      },
      fontFamily: {
        imbue: ['"Imbue"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
