const { resolve } = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

const config = {
  entry: {
    main: resolve('./src/index.ts')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: ['awesome-typescript-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
     },
     {
       test: /\.html$/,
       use: [
         {
           loader: 'html-loader',
           options: { minimize: !isDevelopment }
         }
       ]
     }
    ]
  },
  devServer: {
    open: true
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  }
}

module.exports = config