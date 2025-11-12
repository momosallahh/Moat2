/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0B0F14',
        accent: '#00AEEF',
        emerald: '#00E6A8',
        gold: '#EFBF45',
        secondary: '#A9B1BC',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
}
