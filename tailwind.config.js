/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#002928',
        // secondary: '#3A3A3A',
        gray: '#D8DADC',
        // darkBlue: '#2E63EA',
        lightGreen: '#E5F0F0',
      },
    },
  },
  plugins: [],
};
