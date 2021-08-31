const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HotModulePlugin = require("webpack").HotModuleReplacementPlugin;
const path = require("path");

module.exports = ({ sourceDir, distDir }) => ({
  output: {
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { 
              sourceMap: true,  
              importLoaders: 1  
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  devServer: {
    watchContentBase: true,
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HotModulePlugin(),
  ],
});
