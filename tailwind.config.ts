import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages//*.{js,ts,jsx,tsx,mdx}',
    './components//*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      mobile: '320px',
      tablet: '640px',
      'tablet-large': '768px',
      desktop: '1024px',
    },

    colors: {
      white: '#FFFFFF',
      'white-secondary': '#D1D2DA',
      'white-soft': '#C8CBE7',
      'dark-blue': '#25273D',
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
    },

    extend: {
      borderRadius: {
        xl: '20px',
      },
    },
  },
  plugins: [],
} satisfies Config
