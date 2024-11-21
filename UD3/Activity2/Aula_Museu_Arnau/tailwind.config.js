/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Pages/Noticies.html"],
  theme: {
    extend: {
      colors: {
        "light-white" : "#FAF9F9"
      }
    },
    screens: {
      "pc" : "958px" ,
      "intermidium" : "800px"

    }
  },
  plugins: [],
}

