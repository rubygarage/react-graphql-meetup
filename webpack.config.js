const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: './app/app.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.(eot|ttf|woff|woff2|svg)(\?.+)?$/,
        exclude: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: './fonts/Icons/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|webp|png|svg)$/,
        exclude: /fonts/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /public/],
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
  ],
};
