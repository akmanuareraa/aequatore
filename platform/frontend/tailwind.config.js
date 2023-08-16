/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      gGreen: "#1DB954",
      gGray: "#0E0E0E",
      gLightGray: "#7E7E7E",
      red: "#A50000",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
