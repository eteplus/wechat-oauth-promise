var webpackMerge = require('webpack-merge');
var config = require('./config.js');
var webpackConfig = require('./webpack.base.conf.js');

module.exports = webpackMerge(webpackConfig, {
  devtool: config.build.devtool || false,
  output: {
    filename: config.build.outputFile
  },
  plugins: config.build.plugins || []
});
