var path = require('path')
var utils = require('./utils')
var config = require('./config')
var webpack = require('webpack')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
// var CompressionWebpackPlugin = require('compression-webpack-plugin')
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
// 获取根目录
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: 'production',
  // 定义入口文件
  entry: {
    index: './components/index.js'
  },
  output: {
    // 输出路径
    path: config.build.assetsRoot,
    // 输出文件名称（name为entry中定义的key值）
    filename: '[name].js',
    // 静态资源路径（判断目前所处的环境）
    // 在开发环境下，路径为根目录
    // 在生产环境下，路径为根目录下的static文件夹
    publicPath: config.build.assetsPublicPath
  },
  performance: {
    hints: false
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  resolve: {
    // 自动解析拓展，可以在引用文件的时候不用写后缀
    extensions: ['.js', '.jsx', '.json'],
    // 配置别名，避免在结构嵌套过深的情况下出现../../../../xxx这种写法
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    // 配置不同模块处理规则
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [resolve('components'), resolve('stories')]
    }, {
      // 对于图片资源，当文件体积小于10kb时，将其生成为base64，直接插入html中
      // 当大于10kb时，将图片名称进行按照命名规则进行更改
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      // 字体资源打包规则，与图片资源相同
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
          options: { minimize: true }
        }
      ]
    }, {
      test: /\.(le|sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
        'less-loader'
      ],
    }]
  },
  plugins: [
    // new HtmlWebPackPlugin({
    //   template: "./src/index.html",
    //   filename: "./index.html"
    // }),  
    new CleanWebpackPlugin(['dist'], { 
      root: path.resolve(__dirname, '..'), 
      exclude: ['assets'],
      verbose: true,
      dry: false 
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'index',
          test: /\.(scss|sass|less|css)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    }
  }
};
