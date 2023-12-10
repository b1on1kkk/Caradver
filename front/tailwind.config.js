/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px"
      },
      height: {
        855: "855px",
        85: "85px",
        320: "320px",
        150: "150px",
        95: "95px",
        200: "200px",
        55: "55px",
        350: "350px",
        110: "110px",
        92: "92px",
        74: "74px"
      },
      width: {
        65: "65px",
        150: "150px",
        95: "95px",
        55: "55px",
        250: "250px",
        50: "84%",
        350: "350px",
        110: "110px",
        92: "92px",
        74: "74px",
        280: "280px",
        240: "240px"
      },
      minHeight: {
        60: "60px",
        400: "400px"
      }
    }
  },
  plugins: []
};
