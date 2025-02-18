/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#12685E",
          secondary: "#AC973D",
          action: "#411A5F",
          light: "#F3ECD4",
          "gradient-primary": "linear-gradient(157.69deg, #12685E 8.69%, #35998D 91.52%)",
          "gradient-secondary": "linear-gradient(-37.87deg, #DAC97D 17.11%, #AC973D 75.31%)",
        },
      },
    },
    plugins: [],
  };
  