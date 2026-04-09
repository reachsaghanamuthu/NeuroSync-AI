/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neuro: {
          purple: '#2c1e4a',
          dark: '#0f0c1b',
          teal: '#1dd3b0',
          pink: '#e07a5f',
          light: '#f4f1de'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
