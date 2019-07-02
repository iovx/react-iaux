const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "../docs/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../docs/build/dist"),
    filename: '[name].[hash].js',
    chunkFilename: '[id].chunk.js',
  },
  stats: {
    children: false,
  },
  mode: "production",
  optimization: {
    minimize: true,
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
      minSize: 2
    }
  },
  resolve: {
    extensions: [ ".ts", ".tsx",".js", ".jsx", "json"],
    alias: {
      "react-iaux": path.resolve(__dirname, "../es")
    },
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
      {test: /\.(txt|md)/, use: ["raw-loader"]},
      {
        test: /\.json$/,
        type: "javascript/auto",
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {}
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
            }
          },
          // {
          //   loader: 'typings-for-css-modules-loader',
          //   options: {
          //     modules:true,
          //     namedExport: true
          //   }
          // },
          {
            loader: "postcss-loader",
            options: {
              // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: () => [
                require("autoprefixer")()
                //CSS浏览器兼容
              ]
            }
          },
        ],
        exclude: ["/node_modules/"]
      },
      {
        test: /\.less/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: () => [
                require("autoprefixer")()
                //CSS浏览器兼容
              ]
            }
          },
          "less-loader"
        ],
        exclude: ["/node_modules/"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['react','env'],
          // plugins: ['transform-decorators-legacy'],
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
    ]
  },
  externals: {
    jquery: '$',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'moment': 'moment',
    'highlight.js': 'hljs',
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../docs/build/public'),
        top: path.resolve(__dirname, '../docs/build/dist/assets'),
        ignore: ['.*'],
      }
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname,"../docs/build/index.ejs"),
      favicon: path.resolve(__dirname,"../docs/build/favicon.ico"),
      chunks: ["main", "vendor"],
      inject: true,
      title: "微风平台 React-iaux",
      minify: {
        removeComment: true,
        collapseWhitespace: true,
      },
    })
  ],
};
