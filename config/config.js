var webpack = require('webpack');

module.exports = {
  libraryName: 'wechat-oauth-promise',
  entryFile: './src/index.js',
  base: {
    outputFile: '[name].js',
    devtool: '#source-map'
  },
  build: {
    outputFile: '[name].min.js',
    devtool: false,
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  }
}
