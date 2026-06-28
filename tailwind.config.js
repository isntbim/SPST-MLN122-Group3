/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        vnred: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#ca0835', // Socialist crimson accent
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        vngold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          400: '#fbbf24', // Prosperity gold accent
          500: '#f59e0b',
          600: '#d97706',
        },
        vnemerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981', // Market green accent
          600: '#059669',
          700: '#047857',
        }
      }
    },
  },
  plugins: [],
}
