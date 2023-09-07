/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gray950: 'var(--gray-950)',
      },
    },
  },
  plugins: [],
};
