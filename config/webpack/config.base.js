const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebappWebpackPlugin = require("webapp-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const webpack = require("webpack");

if (!process.env.API_URI) {
  throw new Error("Environment variable API_URI not set");
}

module.exports = ({ sourceDir, distDir }) => ({
  resolve: {
    alias: {
      "@farmatheme": "@farmacia-retail/farmauna-components/tailwind.config"
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },
  entry: {
    app: `${sourceDir}/index.tsx`,
  },
  output: {
    path: distDir,
    publicPath: "/",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
      },
      {
        test: /\.(woff2?|ttf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "/fonts/",
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "/images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                enabled: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: distDir,
    }),
    new HtmlWebpackPlugin({
      filename: `${distDir}/index.html`,
      template: `${sourceDir}/index.html`,
      API_URI: process.env.API_URI,
      GTM_ID: process.env.GTM_ID
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint:  {
        files: './src/**/*.{ts,tsx,js,jsx}'
      },
      exclude: "node_modules",
    }),
    // PWA plugins
    new WebappWebpackPlugin({
      logo: `${sourceDir}/images/favicon.png`,
      prefix: "images/favicons/",
      favicons: {
        appName: "Farmacia Digital",
        appDescription: "Farmacia Digital",
        display: "standalone",
        developerURL: null, // prevent retrieving from the nearest package.json
        background: "#ddd",
        theme_color: "#333",
      },
    }),
    new webpack.EnvironmentPlugin({
      API_URI: "http://localhost:8000/graphql/",
      ENVIRONMENT_NAME: "dev",
      GTM_ID: "__",
      GTM_AUTH: "__",
      GTM_PREVIEW: "__",
      CDN_URL: "__",
      MAPS_API_KEY: "__",
      MERCHANT_PASSWORD: "__",
      MERCHANT_USERNAME: "__",
      MERCHANT_ID: "__",
      OPTIMIZELY_SDK_KEY: "__",
      PRIME_API_URL: "__",
      PRIME_API_KEY: "__",
      PRIME_SKU: "__",
      NIUBIZ_ANTIFRAUD_SCRIPT_URL: "__",
    }),
  ],
  node: {
    fs: "empty",
    module: "empty",
  },
});
