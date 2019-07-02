const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry:path.resolve(__dirname, "../docs/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../docs/build/dist"),
    filename: '[name].[hash].js',
    chunkFilename: '[id].chunk.js',
  },
  mode: "development",
  stats: {
    children: false,
  },
  optimization: {
    minimize: false,
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
      minSize: 2
    }
  },
  resolve: {
    alias: {
      "react-iaux": path.resolve(__dirname, "../es")
    },
    extensions: [ ".ts", ".tsx",".js", ".jsx", "json"]
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
          presets: ['env'],
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
  devtool: "cheap-eval-source-map",
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'moment': 'moment',
    'highlight.js': 'hljs',
    // 'react-router': 'ReactRouter',
    // 'react-router-dom': 'ReactRouterDOM',
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../docs/build/dist"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: "/",
    // host: "127.0.0.1",
    port: 7007,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        pathRewrite: {"^/api": "/api"}
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE.ENV": "development"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../docs/build/public'),
        top: path.resolve(__dirname, '../docs/build/dist/assets/'),
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
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
