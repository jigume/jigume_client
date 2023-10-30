/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primaryYello: '#FFAE39',
        primaryJade: '#8CDDE2',
        primaryPurple: '#E4CCFF',
        primaryBlue: '#0D99FF',
        success: '#1EBAD2',
      },
    },
    screens: {
      sm: '444px',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
