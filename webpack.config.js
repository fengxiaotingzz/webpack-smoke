const path = require("path");
const HtmlWebpacPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      { test: /\.css/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      { test: /\.js$/, use: "babel-loader" },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              runtimeCompat: true,
              symbolId: "[name]-[contenthash:5]",
            },
          },
          "svgo-loader",
        ],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name]_[hash].[ext]", outputPath: "imgs/" },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpacPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: true,
    }),
    new MiniCssExtractPlugin({ filename: "[name]_[contenthash:8].css" }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
