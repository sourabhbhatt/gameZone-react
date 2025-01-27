/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line to scan your files for Tailwind classes
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        drawLine: 'drawLine 1s ease-out forwards',
        shine: 'shine 1.5s infinite alternate',
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      keyframes: {
        drawLine: {
          from: { width: '0' },
          to: { width: 'var(--final-width, 100%)' },
        },
        shine: {
          '0%, 100%': {
            boxShadow: '0 0 0px #ffffff, 0 0 20px #ffffff',
            border: '2px solid #ffffff', // Add a red border
            // borderRadius: '15%',

            
          },
          '50%': {
            boxShadow: '0 0 10px #ffffff, 0 0 20px #ffffff',
            border: '2px solid #ffffff',
            // borderRadius: '15%',

            // Add a red border

          },
        },
      },
    },
  },
  plugins: [],
};
