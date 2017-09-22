const webpack           = require('webpack')
,     ExtractTextPlugin = require('extract-text-webpack-plugin')
,     path              = require('path')
;

module.exports = {

  entry: ['./js/main.js'],

  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    loaders: [
        {
            test: /\.(svg|jpg|png)$/,
            loader: 'url-loader'
        },
        {
            test: /\.css/,
            loaders: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            /*loaders: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]*/
        },
        {
          test: /\.html$/,
          loader: 'mustache-loader'
          // loader: 'mustache-loader?minify'
          // loader: 'mustache-loader?{ minify: { removeComments: false } }'
          // loader: 'mustache-loader?noShortcut'
        }
    ]
  },

  plugins: [
    new ExtractTextPlugin({ // define where to save the file
        filename: 'build/[name].bundle.css',
        allChunks: true,
    }),
  ],
}