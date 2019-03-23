const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "../docs/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../docs/build"),
    publicPath: "http://127.0.0.1:7007/docs/build/",
    filename: "index.js"
  },
  mode: "development",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "../components"),
      "react-iaux": path.resolve(__dirname, "../lib")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
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
              // alias 解析别名
              // importLoader(@import)
              // modules: 是否开启css-modules
              module: true,
              Minimize: false,
              camelCase: true
            }
          },
          // {
          //   loader: "typings-for-css-modules-loader",
          //   options: {
          //     modules: true,
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
              // alias 解析别名
              // importLoader(@import)
              // modules: 是否开启css-modules
              module: true,
              Minimize: false,
              camelCase: true
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
        use: ["babel-loader"]
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
  devServer: {
    contentBase: path.resolve(__dirname, "../docs/build"),
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: "/docs/build/",
    host: "127.0.0.1",
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
    new webpack.HotModuleReplacementPlugin()
  ]
};
