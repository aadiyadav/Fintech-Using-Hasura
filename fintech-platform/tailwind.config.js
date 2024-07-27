/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a2e',
        darker: '#16213e',
        accent: '#0f3460',
        funky: '#e94560',
        light: '#eaeaea',
      },
      fontFamily: {
        one: "Rubik",
        two: "Playfair Display"
      }
    },
  },
  plugins: [],
}

