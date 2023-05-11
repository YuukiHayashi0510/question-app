/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        laptop: '1024px',
        desktop: '1200px',
        laptopL: '1440px',
      },
      colors: {
        'ai-main': '#C4AE17',
      },
    },
  },
  plugins: [],
  important: true,
}
