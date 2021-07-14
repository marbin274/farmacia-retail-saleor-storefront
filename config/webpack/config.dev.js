const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HotModulePlugin = require("webpack").HotModuleReplacementPlugin;
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
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
          { loader: "sass-loader" },
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
    new StatoscopeWebpackPlugin({
      saveReportTo: 'performance/report-[name]-[hash].html',
      saveStatsTo: 'performance/stats-[name]-[hash].json',
      saveOnlyStats: false,
      watchMode: false,
      name: 'farmauna-webpack-bundle-report',
      open: 'file',
      compressor: 'gzip',
    })
  ],
});
