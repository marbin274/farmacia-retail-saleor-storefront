const purgecss = require("@fullhuman/postcss-purgecss")({
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/index.html",
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
    plugins: [
        require("tailwindcss")("./src/tailwind/config.js"),
        require("autoprefixer"),
    ],
};