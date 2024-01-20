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
      transitionProperty: {
        'height': 'height',
        'max-height': 'max-height',
      },
    },
    screens: {
      sm: '444px',
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
