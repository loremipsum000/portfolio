/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '481px',   // Small: 481px - 720px
      'md': '721px',   // Medium: 721px - 960px
      'lg': '960px',   // Large: 960px - 1279px
      'xl': '1280px',  // Extra Large: 1280px+
      // Mobile (default): 0px - 480px (no prefix needed)
    },
  },
  plugins: [],
}

