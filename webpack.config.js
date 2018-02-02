const path = require('path');

module.exports = {
  entry: './js/init.js',
  output: {
    filename: './js/bundles.js'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2015", "stage-3"],
          }
        }
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
     {
       test: /\.(png|svg|jpg|gif)$/,
       use: [
         'file-loader'
       ]
     },
    { test: /\.handlebars$/, loader: "handlebars-loader" }
    ]
}
};
