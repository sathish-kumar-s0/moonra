/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: '#07080A',
          card: '#101216',
          cardGlow: '#1B0D0E',
          surface: '#15171D',
          border: '#22252E',
          redBorder: '#3D1518',
          red: '#D0232B',
          redDark: '#A61A20',
          gold: '#C9A45C',
          goldLight: '#E8D6A8',
          goldText: '#D4A359',
          muted: '#9EA2AA',
          subtle: '#6B707B'
        }
      },
      fontFamily: {
        display: ['Montserrat', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
