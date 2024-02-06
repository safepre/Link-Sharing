/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#633CFF',
        dark: {
          gray: '#333',
          grey: '#737373',
        },
      },
      boxShadow: {
        ml: '0px 0px 32px 0px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
};
