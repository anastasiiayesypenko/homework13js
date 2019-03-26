const path = require('path');
const argv = require('yargs').argv; // dev - prod
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public'); // final dir

const config = {
    entry: {
        main: './src/js/index.js'
    },
    output: {
        filename: 'bundle.js', // final js-file from index.js
        path: distPath
    },
    module: {
        rules: [{
            test: /\.html$/, // with wich files to work with
            use: 'html-loader' // npm packet to work with additional files, like .php mp3 woff etc
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: [
                      isProduction ? require('cssnano') : () => {},
                      require('autoprefixer')({
                        browsers: ['last 2 versions']
                      })
                    ]
                  }
                },
                'sass-loader'
              ]
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                  name: 'images/[name][hash].[ext]'
                }
              }, {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 70
                  }
                }
              }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name][hash].ext'
                }
            }
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
    ],
    optimization: isProduction ? {
        minimizer: [
          new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
              compress: {
                inline: false,
                drop_console: true
              },
            },
          }),
        ],
    } : {},    
    devServer: {
        contentBase: distPath,
        port: 9001,
        compress: true,
        open: true
    }
};
module.exports = config;
