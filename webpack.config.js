var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin")

var config = {
  entry: "./src/script/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        include: /\.pug$/,
        loader: ("pug-html-loader?pretty")
      },
      {
        include: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        include: /\.json$/,
        loader: "json"
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
      from: "./src/article",
      to: "article"
    },
    {
      from: "./src/config.json"
    }
    ])
  ]
};

module.exports = config;
