const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  optimization: {
    minimize: false
  },
  devtool: false
};