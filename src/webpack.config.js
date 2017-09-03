const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';
const config = {
  cache: true,
  context: __dirname,
  devtool: debug ? 'eval-source-map' : false,
  entry: ['index.js'],
  output:
    {
      path: `${__dirname.slice(0, -3)}dist/`,
      filename: 'resdiary-booking-plugin.min.js',
    },
  plugins: debug ? [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', ['env', {modules: false}], 'stage-0'],
            plugins: debug ? ['transform-runtime', 'react-hot-loader/babel'] : ['transform-runtime']
          }
        }
      },
      {
        test: /\.css$/,
        use:
          [
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
  },
  resolve: {
    modules: [__dirname, 'node_modules']
  }
};

if (debug) {

  config.devServer = {
    hotOnly: true,
    proxy: {
      '/wp-admin/admin-ajax': {
        target: {
          host: 'incipio',
          protocol: 'http:',
          port: 80
        },
        changeOrigin: true,
        secure: false
      },
      '/proxy': {
        target: {
          host: 'incipio',
          protocol: 'http:',
          port: 80
        },
        changeOrigin: true,
        secure: false
      }
    },

    historyApiFallback: true
  };

  config.entry.unshift('react-hot-loader/patch');
}

module.exports = config;
