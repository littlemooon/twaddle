const path    = require('path');
const webpack = require('webpack');

module.exports = {
  entry:  [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:' + (process.env.PORT || 3000)
    },
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    }
  }
};
