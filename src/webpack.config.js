const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';
const config = {
    cache: true,
    context: __dirname,
    devtool: debug ? 'eval-source-map' : false,
    entry: ['app.js'],
    output:
      {
        path: `${__dirname.slice(0, -3)}dist/`,
        filename: 'resdiary-booking-plugin.min.js',
        // publicPath: '/dist/'
      },
    plugins: debug ? [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ] :
      [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
      ],
    module:
      {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['react', ['env', {modules: false}], 'stage-0'],
                plugins: debug ? 'react-hot-loader/babel' : []
              }
            }
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: debug
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: debug,
                  config: {
                    ctx: {
                      cssnano: {},
                      autoprefixer: {},
                      'postcss-nested': {}
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ,
    resolve: {
      modules: [__dirname, 'node_modules']
    }
  }
;

if (debug) {

  config.devServer = {
    hotOnly: true,
    // publicPath: '/dist/',
    // proxy: {
    //   'https://api.resdiary.com/api/': {
    //     target: 'http://localhost:3000'
    //   }
    // },
    historyApiFallback: true
  };

  config.entry.unshift('react-hot-loader/patch');
}

module.exports = config;
