/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tet-red': '#D32F2F',
        'tet-gold': '#FFD700',
        'tet-yellow': '#FFC107',
      },
      fontFamily: {
        'tet': ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
