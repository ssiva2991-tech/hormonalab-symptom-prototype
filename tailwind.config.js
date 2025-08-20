
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F59E0B', // amber-500
        accent: '#F97316',  // orange-500
        brandbg: '#FFFBEB', // amber-50
      }
    },
  },
  plugins: [],
}
