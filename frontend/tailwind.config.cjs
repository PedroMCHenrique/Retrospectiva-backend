/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '300px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        green: '#43a97c',
        'green-900': '#1c2d3a',
      },
    },
  },
  plugins: [],
};
