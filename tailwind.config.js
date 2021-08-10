const tailwindConfig = require("@farmacia-retail/farmauna-components/tailwind.config");

module.exports = {
  ...tailwindConfig,
  prefix: "fa-",
  theme: {
    ...tailwindConfig.theme,
    colors: {
      ...tailwindConfig.theme.colors,
      brand: {
        ...tailwindConfig.theme.colors.brand,
        "03": "#008A66",
      },
    },
    screens: {
      xs: "320px",
      sm: "540px",
      md: "720px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "1920px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  purge: {
    enabled: process.env.NODE_ENV !== "develop",
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/index.html",
    ],
  },
};