const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  test: /\.(s[ac]|c)ss$/i,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: '' },
    },
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
}