const path = require('path');

module.exports = {
  entry: './src/web-component.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'analog-clock-component.js',
    library: 'AnalogClockComponent',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    // Don't bundle React - let the host page provide it, or bundle it if needed
    // Comment out these lines if you want React bundled in the component
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  optimization: {
    minimize: true
  }
}; 