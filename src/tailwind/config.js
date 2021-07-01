const tailwindConfig = require("@farmacia-retail/farmauna-components/tailwind.config");

module.exports = {
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
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
};
