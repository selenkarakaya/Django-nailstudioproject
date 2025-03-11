/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this based on your file structure
  ],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "1026px", xl: "1440px" },
    extend: {
      colors: {
        lightBlue: "#d3edec",
        mediumBlue: "#9FACE1",
        darkBlue: "#5168C4",
        green: "#268986",
        lightBg: "#f8f8ff",
        pink: "#ff70a2",
      },
      backgroundImage: {
        main: "url('./assets/image/home-main.png')",
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
