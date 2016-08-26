var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var config = require('./config.js');

module.exports = {
  // 入口, 定义要打包的文件
  entry: {
    [config.libraryName]: config.entryFile
  },
  // 出口，定义打包输出的文件; 包括路径，文件名
  output: {
    path: path.resolve(__dirname, '../dist'),
    library: config.libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: config.base.outputFile,
  },
  devtool: config.base.devtool || '#source-map',
  target: 'node',
  // resolve: 定义能够被打包的文件，文件后缀名
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  externals: {
    "request": "request"
  },
  // webpack 将所有的资源都看做是模块，而模块就需要加载器；
  // 主要定义一些loaders, 定义哪些后缀名的文件应该用哪些loader
  // test: 检测哪些文件需要此 loader ，是一个正则表达式
  // exclude: 忽略哪些文件
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: projectRoot
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: config.base.plugins || []
};
