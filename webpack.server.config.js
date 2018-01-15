const nodeExternals = require('webpack-node-externals');

const path = require('path');

const SRC = path.resolve(__dirname, './src/server');
const BUILD = path.resolve(__dirname, './build/server');

const config = {
  context: SRC,
  target: 'node',

  entry: path.join(SRC, 'index.js'),
  output: {
    path: BUILD,
    filename: 'server.js',
    publicPath: '/',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        loader: 'babel-loader',
      },
    ],
  },
  externals: nodeExternals(),
};

module.exports = config;
