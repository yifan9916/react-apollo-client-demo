module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: {
        flexbox: 'no-2009',
        // grid: 'autoplace',
      },
    },
    // '@fullhuman/postcss-purgecss': {
    //   content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
    // },
  },
};
