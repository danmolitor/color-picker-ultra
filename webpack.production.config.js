let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const modulesPath = path.join(__dirname, 'node_modules');

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var WebpackEnvPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  PORT: JSON.stringify(process.env.PORT)
});

module.exports = {
  entry: [
  './app/index.js'
  ],
  output: {
  path: __dirname + '/dist',
  filename: 'index_bundle.js',
  publicPath: '/assets/'
  },
  postcss: [autoprefixer],
  resolve: {
    extensions: ['', '.png', '.css', '.scss', '.js', '.json'],
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      { test: /\.css$/,
        exclude : path.join(__dirname, '/node_modules/react-toolbox/'),
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader") },
      {
        test: /\.scss$/,
        exclude : path.join(__dirname, '/node_modules/react-toolbox/'),
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
      },
      {
        test    : /(\.scss|\.css)$/,
        include : path.join(__dirname, '/node_modules/react-toolbox/'),
        loaders : [
          require.resolve('style-loader'),
          require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          require.resolve('sass-loader') + '?sourceMap'
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
      }
    ]
  },
  plugins: [
  HtmlWebpackPluginConfig,
  WebpackEnvPlugin,
  new ExtractTextPlugin('css/main.css', {
            allChunks: true
        }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin()
  ]
}
