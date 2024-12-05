/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      screens: {
        "pc" : "958px" ,
        "intermidium" : "800px",
        "pc-large" : "1500px",
        "tablet" : "600px"
        
  
      }
    },
  },
  plugins: [],
}

