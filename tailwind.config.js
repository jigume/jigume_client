/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gray50: 'var(--gray-50)',
        gray100: 'var(--gray-100)',
        gray600: 'var(--gray-600)',
        gray950: 'var(--gray-950)',
      },
    },
  },
  plugins: [],
};
