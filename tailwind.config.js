/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': { 'max': '768px'},
        'lg': {'min': '769px', 'max': '992px'},
        'xl': {'min': '993px', 'max': '1240px'},
        '2xl': {'min': '1241px'},
      }
    },
    fontFamily: {
      'roboto': ["Roboto"],
    }
  },
  
  plugins: [],
}







