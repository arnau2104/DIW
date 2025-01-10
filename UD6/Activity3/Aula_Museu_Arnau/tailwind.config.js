/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.html"],
  theme: {
    extend: {
      colors: {
        "light-white" : "#FAF9F9",
        "navy-blue" : "#001E33",
        "cream-white" : "#FFF8F0",
        "black" : "#00171F"
      }
    },
    screens: {
      "pc" : "958px" ,
      "intermidium" : "800px",
      "pc-large" : "1500px",
      "tablet" : "600px"
      

    }
  },
  plugins: [],
}


