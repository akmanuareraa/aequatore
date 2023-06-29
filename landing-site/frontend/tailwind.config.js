/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      "custom-bg-primary": "#f0eace",
      "custom-font-primary": "#f0eace",
      white: "#ffffff",
      black: "#000000",
    },
  },
  plugins: [require("daisyui")],
};
