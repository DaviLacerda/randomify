/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          "400": "#F7D633",
        }
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "fade-effect": "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.425) 52.08%, rgba(0, 0, 0, 0.025) 100%)"
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
}
