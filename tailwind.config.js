/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        mainBackground:
          "url('/svg-icons/right-square.svg'), url('/svg-icons/left-square.svg')",
      },
      // Customize your theme here if you like
    },
  },
  plugins: [],
};
