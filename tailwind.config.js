/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`, "./public/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],

  daisyui: {
    themes: ["dim"],
  },
}

