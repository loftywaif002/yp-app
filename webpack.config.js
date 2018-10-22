const path = require("path");
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*
Entry: (optional) it’s our main Javascript file where all of the application’s code gets imported
Output: (optional) it’s the resulting Javascript file, bundled by Webpack
Module and rules: it’s the place where you configure the loaders
Plugins: it’s the place where you configure which plugins Webpack will use
*/
/*
Benifits of using CSS loaders in webpack is that we can use bunch of css files for separate modules
*/
const VENDOR_LIBS = [
  'react', 'redux', 'react-redux', 'react-dom'
];
module.exports = {
  entry: {
    bundle: './src/index.js', /*webpack will look for this file*/
    vendor: VENDOR_LIBS
  }, 
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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
           {
            loader: 'url-loader',
            options: { limit: 50000 } /*If the image is greater than 50000 bytes, save it as separate image otherwise include it in bundle.js*/
           },
           'image-webpack-loader'
         ]
       }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: 'bundle.js'  /*code splitted based on vendor code and bundle*/
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [ 
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
  new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};