/** @type {import("webpack").Configuration} */
module.exports = {
  target: "webworker",
  entry: "./src/index",
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  resolve: {
    extensions: [".js", ".ts"],
    // see https://github.com/brix/crypto-js/issues/326
    fallback: { crypto: false },
  },
};
