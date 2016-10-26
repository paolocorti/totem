import path from 'path'
export default {
  entry: `${__dirname}/app/main.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
