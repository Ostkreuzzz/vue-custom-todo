import type { Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: '320px',
      tablet: '640px',
      'tablet-large': '768px',
      desktop: '1024px',
    },

    colors: {
      'dark-gray': '#393A4B',
      'dark-blue': '#25273D',
      'dark-white': '#C8CBE7',
      white: '#FFFFFF',
      'white-secondary': '#D1D2DA',
      'light-gray': '#5B5E7E',
      'light-gray-secondary': '#9495A5',
      'light-gray-outline': '#494C6B',
      blue: '#3A7CFD',
      grey: '#817D92',
    },

    fontFamily: {
      primary: ['Outfit', 'sans-serif'],
    },

    spacing: {
      4: '4px',
      8: '8px',
      10: '10px',
      12: '12px',
      16: '16px',
      18: '18px',
      22: '22px',
      24: '24px',
      28: '28px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
      66: '66px',
      72: '72px',
      80: '80px',
      96: '96px',
      108: '108px',
      152: '152px',
      220: '220px',
      540: '540px',
    },

    extend: {
      borderRadius: {
        xl: '20px',
      },

      backgroundImage: {
        'desktop-dark': "url('/background/bg-desktop-dark.jpg')",
        'desktop-light': "url('/background/bg-desktop-light.jpg')",
        'mobile-dark': "url('/background/bg-mobile-dark.jpg')",
        'mobile-light': "url('/background/bg-desktop-light.jpg')",
        'icon-close': "url('/src/components/icons/icon-cross.svg')",
        'icon-light': "url('/src/components/icons/icon-sun.svg')",
        'icon-dark': "url('/src/components/icons/icon-moon.svg')",
      },
    },
  },
  plugins: [typography, forms, aspectRatio],
} satisfies Config
