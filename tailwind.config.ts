import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
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
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
