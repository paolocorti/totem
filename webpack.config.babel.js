import path from 'path'
export default {
  entry: `${__dirname}/app/main.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      }
    ]
  }
}
