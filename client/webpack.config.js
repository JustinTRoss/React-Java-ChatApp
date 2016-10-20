module.exports = {
  entry: './js/index.js',
  output: {
    path: __dirname,
    filename: '../backend/RESTService/src/main/resources/static/built/bundle.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
