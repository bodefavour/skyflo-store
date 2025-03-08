/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [// If using CRA:
    "./src/**/*.{js,jsx,ts,tsx}", // for CRA
    "./pages/**/*.{js,ts,jsx,tsx}", // for Next.js
    "./components/**/*.{js,ts,jsx,tsx}",],
  safelist: [
    'text-xs', 'md:text-sm', 'lg:text-base',
    'tracking-tight', 'leading-snug'
  ],
  theme: {
    extend: {
      fontFamily: {
        phudu: ["Phudu", "sans-serif"],
      },},
  },
  plugins: [],
}

