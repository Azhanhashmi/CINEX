/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: '#e50914', dark: '#c4070f' },
      },
      fontFamily: {
        title: ["'Bebas Neue'", 'sans-serif'],
        body:  ["'Inter'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
