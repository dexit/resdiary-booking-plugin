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
      publicPath: '/',
      filename: 'resdiary-booking-plugin.min.js',
    },
  plugins: debug ? [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
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
        test: /\.(s?)css$/,
        use:
          [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: debug
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: debug,
                config: {
                  ctx: {
                    autoprefixer: {
                      browsers: [
                        'last 2 versions',
                        'android 4',
                        'opera 12'
                      ]
                    }
                  }
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: debug
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './node_modules/breakpoint-sass/stylesheets/_breakpoint.scss'
                ]
              }
            },
          ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.modernizrrc.js$/,
        loader: 'modernizr-loader'
      },
      {
        test: /\.modernizrrc(\.json)?$/,
        loader: 'modernizr-loader!json-loader'
      }
    ]
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      modernizr$: '.modernizrrc'
    }
  }
};

if (debug) {

  config.devServer = {
    hotOnly: true,
    proxy: {
      '/wp-admin/admin-ajax': {
        target: {
          host: 'incipio',
          protocol: 'https:',
          port: 443
        },
        changeOrigin: true,
        secure: false
      },
      '/proxy': {
        target: {
          host: 'incipio',
          protocol: 'https:',
          port: 443
        },
        changeOrigin: true,
        secure: false
      }
    },
    publicPath: '/',
    historyApiFallback: true
  };

  config.entry.unshift('react-hot-loader/patch');
}

module.exports = config;
