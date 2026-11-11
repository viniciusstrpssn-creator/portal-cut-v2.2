/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: { xs: '480px' },
      colors: {
        'cut-red': '#E52229', // Cor primária da CUT
        'cut-dark': '#1a1a1a',
        'cut-gray': '#f4f4f4',
        'token-page': 'var(--bg-page)',
        'token-surface': 'var(--bg-surface)',
        'token-surface-elevated': 'var(--bg-surface-elevated)',
        'token-primary': 'var(--text-primary)',
        'token-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
