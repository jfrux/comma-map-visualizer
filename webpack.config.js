const fs = require('fs');
const path = require('path');
const { resolve } = path;

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const port = process.env.PORT || 3000;
const publicPath = `http://localhost:${port}/build`;

console.log("Building Trip Index");
const tripFiles = fs.readdirSync(resolve(__dirname, 'build/trips'));
console.log(tripFiles);
const trips = tripFiles.map((tripFile) => {
  return {
    fileName: tripFile
  }
});
fs.writeFileSync(resolve(__dirname,'build/trips/index.json'),JSON.stringify(trips));
console.log("Trip Index Complete");

const config = {
  stats: {
    maxModules: 0
  },
  mode: 'development',
  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    resolve(__dirname,'app/assets/scss/main.scss'),
    resolve(__dirname,'app/main.js')
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: publicPath,
  },

  context: resolve(__dirname, 'app'),

  devServer: {
    hot: true,
    port: 3000,
    contentBase: resolve(__dirname, 'build'),
    historyApiFallback: true,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                sourceMap: true,
                modules: true,
              },
            },
          ],
          publicPath: '../'
        })),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
              name: 'images/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/svg+xml',
              name: 'images/[name].[ext]',
            }
          }
        ],
      },
    ]
  },

  plugins: [
    new Dotenv(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        }
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({ filename: './styles/style.css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([{ from: 'vendors', to: 'vendors' }]),
    // new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = config;
