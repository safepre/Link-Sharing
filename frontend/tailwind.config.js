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
        'light-purple': '#efebff',
        GitHub: '#000000',
        YouTube: '#FF0000',
        LinkedIn: '#0077B5',
        LeetCode: '#FFBF00',
        Facebook: '#2D68FF',
        Twitch: '#6441a5',
        Devto: '#333333',
        Replit: '#EB4925',
        X: '#666666',
        freeCodeCamp: '#302267',
        KhanAcademy: '#AFE1AF',
        StackOverflow: '#EC7100',
        FrontendMentor: '#D7D7D7',
        Hashnode: '#0330D1',
        Codewars: '#8A1A50',
        CodePen: '#222222',
        GitLab: '#EB4925',
      },
      boxShadow: {
        ml: '0px 0px 32px 0px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
}
