const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

const SRC = path.resolve(__dirname, './src/client');
const BUILD = path.resolve(__dirname, './build/client');

const plugins = [];

if (process.env.NODE_ENV === 'analyse') {
  plugins.push(new BundleAnalyzerPlugin());
}

const config = {
  entry: {
    client: path.join(SRC, 'index.jsx'),
  },
  output: {
    path: BUILD,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.(jsx)$/, loader: 'babel-loader', exclude: ['node_modules'] },
      { test: /\.(js)$/, loader: 'babel-loader', exclude: ['node_modules'] },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins,
};

module.exports = config;
