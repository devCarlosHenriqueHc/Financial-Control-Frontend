/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // Usa o esquema de cor do sistema
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}", 
    "./src/pages/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};