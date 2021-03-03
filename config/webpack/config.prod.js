const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimization = {
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: "common",
        chunks: "all",
      },
      react: {
        test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
        name: "app",
        chunks: "all",
      },
    },
  },
};

module.exports = ({ sourceDir, distDir }) => ({
  output: {
    filename: "js/[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  optimization,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
});
