/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.blue,
      secondary: colors.white,
      neutral: colors.gray,
    },
    fontFamily: {
      sans: ["Open sans",'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}

