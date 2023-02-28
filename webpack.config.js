// Webpack is a popular open-source module bundler for JavaScript applications
// takes in a set of JavaScript modules and their dependencies and package them into a smaller set of static assets (typically a few JavaScript and CSS files) that can be served to a web browser

const path = require("path");

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),

  output: {
    path: path.join(__dirname, "client/dist"),
    filename: 'bundle.js'
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  }
};
