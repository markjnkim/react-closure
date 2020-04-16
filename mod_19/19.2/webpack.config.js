const webpack = require("webpack")
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: "./assets/js/script.js",
  output: {
    path: __dirname + "/dist" ,
    filename: "[name].bundle.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    }),
  ],
  mode: "development"
};