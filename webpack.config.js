var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');

module.exports = {
  // 入口, 定义要打包的文件
  entry: {
    'wechat-oauth-promise': ['./src/index.js']
  },
  // 出口，定义打包输出的文件; 包括路径，文件名，还可能有运行时的访问路径（ publicPath ）参数
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'wechat-oauth-promise',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: '[name].js',
  },
  devtool: '#source-map',
  // devtool: false,
  target: 'node',
  // resolve: 定义能够被打包的文件，文件后缀名
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      'src': path.resolve(__dirname, 'src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
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
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.optimize.OccurenceOrderPlugin()
  ]
};
