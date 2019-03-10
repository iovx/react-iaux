/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
module.exports = {
  entry: "./components/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname) + "/dist"
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "react-iaux": path.resolve(__dirname,"/lib"),
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js", ".jsx", ".ts", ".tsx", "js", ".json"]
  },
  mode: "development",
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
      {test: /\.txt/, use: ["raw-loader"]},
      {
        test: /\.json$/,
        type: 'javascript/auto',
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {}
          },
          // {
          //   loader: "css-loader",
          //   options: {
          //     // alias 解析别名
          //     // importLoader(@import)
          //     // modules: 是否开启css-modules
          //     module:true,
          //     Minimize: false,
          //     camelCase: true
          //   }
          // },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true
            }
          },
          "postcss-loader"
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
        use: ["babel-loader"],
        exclude: ["/node_modules/"]
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
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    moment: {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
    },
  },
  devServer: {
    hot: true,
    publicPath: '/dist/',
    port: 7001
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
