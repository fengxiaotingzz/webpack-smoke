const rimraf = require("rimraf");
const path = require("path");
const webpack = require("webpack");
const Mocha = require("mocha");

const mocha = new Mocha();

rimraf(path.join(__dirname, "../../dist"), () => {
  const webpackProd = require(path.join(__dirname, "../../webpack.config.js"));

  webpack(webpackProd, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    console.log(
      stats.toString({
        color: true,
        modules: false,
        children: false,
      })
    );

    mocha.addFile(path.join(__dirname, "html-test.js"));
    mocha.addFile(path.join(__dirname, "css-test.js"));

    mocha.run();
  });
});
