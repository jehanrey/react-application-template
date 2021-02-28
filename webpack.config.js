const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {
  fontsLoader,
  imagesLoader,
  jsLoader,
  stylesLoader,
} = require('./loaders')

let mode = 'development'
let target = 'web'
let plugins = [
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html') }),
]
const extensionsToResolve = [ '.js', '.jsx' ]
const aliasToResolve = {
  components: path.resolve(__dirname, 'src/components'),
  fonts: path.resolve(__dirname, 'src/assets/fonts'),
  images: path.resolve(__dirname, 'src/assets/images'),
}

if (process.env.NODE_ENV === 'production') {
  mode = 'production'
  target = 'browserslist'
}

if (!process.env.SERVE) {
  plugins.unshift(new CleanWebpackPlugin())
}

module.exports = {
  mode,
  target,
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      fontsLoader,
      imagesLoader,
      jsLoader,
      stylesLoader,
    ],
  },
  plugins,
  resolve: {
    extensions: extensionsToResolve,
    alias: aliasToResolve,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    historyApiFallback: true,
  }
}