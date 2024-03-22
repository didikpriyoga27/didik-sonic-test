/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#447BE6',
        border: '#E0E4E8',
        grey: '#989898',
        green: '#16A41C',
      },
      fontFamily: {
        poppins_100: ['Poppins-Thin'],
        poppins_200: ['Poppins-ExtraLight'],
        poppins_300: ['Poppins-Light'],
        poppins_400: ['Poppins-Regular'],
        poppins_500: ['Poppins-Medium'],
        poppins_600: ['Poppins-SemiBold'],
        poppins_700: ['Poppins-Bold'],
        poppins_800: ['Poppins-ExtraBold'],
        poppins_900: ['Poppins-Black'],
      },
    },
  },
  plugins: [],
};
