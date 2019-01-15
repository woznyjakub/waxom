const { resolve } = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/js/app.js" /*,
    libs: ["@glidejs/glide", "./src/js/libs.js"]*/
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000,
            name: "img/[hash].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/html/index.html"
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(resolve(__dirname, "src/html/*.html"))
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: libs
    // })
  ]
};
