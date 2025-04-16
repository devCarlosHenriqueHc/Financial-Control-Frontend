/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // Usa o esquema de cor do sistema
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}", 
    "./src/pages/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        'input-bg': '#2a2a2a',
        'button-bg': '#0d47a1',
        gain: '#00ff00',
        loss: '#ff0000',
      },
    },
  },
  plugins: [],
};