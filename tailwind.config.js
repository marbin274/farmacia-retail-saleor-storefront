const tailwindConfig = require('@farmacia-retail/farmauna-components/tailwind.config');

module.exports = {
  ...tailwindConfig,
  prefix: 'fa-',
  theme: {
    extend: {
      ...tailwindConfig.theme.extend,
      maxWidth: {
        screen: '100vw',
      },
      width: {
        100: '25rem',
      },
    },
    colors: {
      ...tailwindConfig.theme.colors,
      aunaBlack: '#131336',
      brand: {
        ...tailwindConfig.theme.colors.brand,
        '03': '#008A66',
      },
      gray: {
        ...tailwindConfig.theme.colors.gray,
        DEFAULT: '#E4E5ED',
        100: '#9194A7',
        dark: '#7d7d7d',
        light: '#e2e3f1',
      },
    },
    screens: {
      xs: '320px',
      sm: '540px',
      md: '720px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1600px',
      '3xl': '1920px',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  purge: {
    enabled: process.env.NODE_ENV !== 'develop',
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
  },
};
