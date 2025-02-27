/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#12685E',
          gradient: '#35998D'
        },
        secondary: {
          DEFAULT: '#AC973D',
          gradient: '#DAC97D'
        },
        action: {
          DEFAULT: '#411A5F'
        },
        light: {
          DEFAULT: '#F3ECD4'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(157.69deg, var(--primary) 8.69%, var(--primary-gradient) 91.52%)',
        'gradient-secondary': 'linear-gradient(-37.87deg, var(--secondary-gradient) 17.11%, var(--secondary) 75.31%)'
      },
      boxShadow: {
        'custom': '0px 4px 4px 0 rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
};