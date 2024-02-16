const colors = require('tailwindcss/colors');

const extensions = ['js', 'ts', 'hbs', 'html','gjs', 'gts'];

module.exports = {
  content: [
    `./app/**/*.{${extensions.join(',')}}`,
    `./tests/**/*.{${extensions.join(',')}}`
  ],
  corePlugins: {},
  plugins: [],
  theme: {
    extend: {
      screens: {
        lxg: '1140px',
        '2xl': '1600px',
        '3xl': '1680px',
      },
    },
    colors: {
      primary: '#CFAF6E',
      secondary: '#2B4999',
      text: '#647377',
      background: '#F2F2F2',
      'background-disabled': '#F6F6F6',
      'text-secondary': '#384043',
      error: '#D72F33',
      warn: '#ffcc00',
      checkedGreen:'#2bd4bd',
      deleteRed:'#fb6f84',
      customcolor1: '#333a49',
      customcolortext1:'#b3c5ef',
      bghover:'#3b82f680',
      crayon:'#f4c152',
      customchampColor1:'#0f1729',
      customTabColor1:'#0e1525',
      customTabColor2:'#0f1729',
      deleteadd:'#828df8',
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      red: colors.red,
      gray: colors.gray,
    },
  },
};
