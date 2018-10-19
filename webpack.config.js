const path = require("path");
const webpack = require("webpack");

/*
Entry: (optional) it’s our main Javascript file where all of the application’s code gets imported
Output: (optional) it’s the resulting Javascript file, bundled by Webpack
Module and rules: it’s the place where you configure the loaders
Plugins: it’s the place where you configure which plugins Webpack will use
*/

/*
Benifits of using CSS loaders in webpack is that we can use bunch of css files for separate modules
*/

module.exports = {
  entry: "./src/index.js", /*webpack will look for this file*/
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js" /*this is a convention to call bundled javascript as bundle.js*/
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};