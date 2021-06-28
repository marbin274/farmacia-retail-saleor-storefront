const tailwindConfig = require("@farmacia-retail/farmauna-components/tailwind.config");

module.exports = {
  ...tailwindConfig,
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
