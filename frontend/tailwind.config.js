/** @type {import('tailwindcss').Config} */
const defaultColors = require('tailwindcss/colors')

// Remove deprecated color references
const { 
  lightBlue, warmGray, trueGray, coolGray, blueGray, 
  ...colors 
} = defaultColors

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:
         {
           'hero_avatar': "url('/assets/avatar_navy.svg)"
         }
    },
    colors: {
      ...colors,
      primary: colors.blue,
      secondary: colors.white,
      neutral: colors.gray,
    },
    fontFamily: {
      sans: ["Open sans",'Helvetica', 'Arial', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"]
    },
  },
  plugins: [],
}

