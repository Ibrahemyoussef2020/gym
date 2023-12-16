/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        costum: {
          clr_dark_blue: "#1A1363",
          clr_medium_blue: "#332F64",
          clr_light_blue: "#77749B",
          clr_thin_blue:"#B8B3EC",
          clr_dark_yellow: "#FDEE21",
          clr_light_yellow:"#FFFF7D",
          clr_dark_gray:"#4B4B4B",
          clr_light_gray:"#E4FFDF",
          clr_thin_gray:"#BCBCBC",
          clr_dark_white:"#ECE9E9",
          clr_light_white:"#FFFFFF",
          clr_medium_black:"#151515",
          clr_light_black:"#3E3E3E",
        },
      },
      width: {
        fit_content: "fit-content",
      },
    },
  },
  plugins: [],
};
