/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Forma DJR Display', 'sans-serif'],
            newsreader: ['Newsreader', 'serif'],
        },
        maxWidth: {
            '3xl': '1728px',
        },
        colors: {
            'red': {
                800: '#FF2727', //red
            },
            'brown': {
                800: '#9D5F26', //brown
            },
            'green': {
                800: '#003330', //green
            },
            'dark': {
                200: '#D6D6D6',
                300: '#F4F4F4',
                400: '#D9DAD9',
                500: '#B2B3B2'
            },
        },
    },
},
  plugins: [],
}
 

 


 

