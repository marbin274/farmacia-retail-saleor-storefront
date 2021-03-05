const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrotliGzipPlugin = require("brotli-gzip-webpack-plugin");
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new BrotliGzipPlugin({
      asset: "[path].br[query]",
      algorithm: "brotli",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliGzipPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
