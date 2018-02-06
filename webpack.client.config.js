const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const SRC = path.resolve(__dirname, './src/client');
const BUILD = path.resolve(__dirname, './build/client');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
  }),
  new CopyWebpackPlugin([{ from: 'img', to: 'img' }, { from: 'sounds', to: 'sounds' }]),
];

if (process.env.NODE_ENV === 'analyse') {
  plugins.push(new BundleAnalyzerPlugin());
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

const config = {
  context: SRC,
  target: 'web',

  devServer: {
    proxy: {
      '/': 'http://localhost:3000',
    },
  },

  entry: {
    client: path.join(SRC, 'index.js'),
    vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'material-ui'],
  },
  output: {
    path: BUILD,
    filename: '[name].js',
    publicPath: '/public/',
  },
  module: {
    loaders: [
      {
        test: /\.(sass)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: ['node_modules'],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', SRC],
    extensions: ['.js'],
  },
  plugins,
  devtool: 'source-map',
};

module.exports = config;
