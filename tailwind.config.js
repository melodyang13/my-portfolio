// tailwind.config.js (at project root)
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f172a',
        darkCard: '#1e293b',
      },
    },
  },
  plugins: [],
}