const path = require("path");
const HtmlWebpacPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlInlineCssWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const glob = require("glob");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "async",
      minChunks: 2,
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "px2rem-loader",
            options: { remUnit: 75, remPrecision: 8 },
          },
        ],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "imgs/",
          },
        },
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 50000000000,
    maxAssetSize: 4000000000000,
  },
  plugins: [
    new HtmlWebpacPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name]_[contenthash:8].css" }),
    new CleanWebpackPlugin(),
    new HtmlInlineCssWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap("done", (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          process.exit(9);
        }
      });
    },
  ],
  stats: "errors-only",
};
