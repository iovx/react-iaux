const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const lessExtractTextWebpackPlugin = new ExtractTextWebpackPlugin({
  filename: 'style/[name].[hash].le.min.css',
});
const cssExtractTextWebpackPlugin = new ExtractTextWebpackPlugin({
  filename: 'style/[name].[hash].min.css',
});

module.exports = {
  entry: path.resolve(__dirname, '../docs/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../docs/build/dist'),
    filename: '[name].[hash].js',
    chunkFilename: 'chunk.[id].js',
    publicPath: '../',
  },
  stats: {
    children: false,
  },
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
      minSize: 30000,
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    alias: {
      'react-iaux': path.resolve(__dirname, '../es'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(md|txt)$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.tsx?$/,
        exclude: ['/node_modules/'],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'import',
                  {
                    libraryName: 'react-iaux',
                    libraryDirectory: 'es', // default: lib
                    style: true,
                  },
                ],
              ],
            },
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },

      {
        test: /\.json$/,
        type: 'javascript/auto',
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        use: cssExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // 如果没有options这个选项将会报错 No PostCSS Config found
                plugins: () => [
                  require('autoprefixer')(),
                  //CSS浏览器兼容
                ],
              },
            },
          ],
        }),
        exclude: ['/node_modules/'],
      },
      {
        test: /\.less$/,
        use: lessExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // 如果没有options这个选项将会报错 No PostCSS Config found
                plugins: () => [
                  require('autoprefixer')(),
                  //CSS浏览器兼容
                ],
              },
            },
            'less-loader',
          ],
        }),
        exclude: ['/node_modules/'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-1'],
          // plugins: ['transform-decorators-legacy'],
          plugins: [
            [
              'import',
              {
                libraryName: 'react-iaux',
                libraryDirectory: 'es', // default: lib
                style: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        // include:[path.resolve(__dirname, "../docs/assets")],
        exclude: /node_modules/,
        options: {
          limit: 15360,
          // outputPath: path.resolve(__dirname,'../docs/build/dist/assets'),
          name: 'assets/[hash:8].[name].[ext]',
          fallback: 'file-loader',
        },
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  externals: {
    jquery: '$',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    moment: 'moment',
    marked: 'marked',
    'highlight.js': 'hljs',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../docs/build/public'),
        top: path.resolve(__dirname, '../docs/build/dist/assets'),
        ignore: ['.*'],
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../docs/build/index.ejs'),
      favicon: path.resolve(__dirname, '../docs/build/favicon.ico'),
      chunks: ['main', 'vendor'],
      inject: true,
      title: '微风平台 React-iaux',
      minify: {
        removeComment: true,
        collapseWhitespace: true,
      },
    }),
    lessExtractTextWebpackPlugin,
    cssExtractTextWebpackPlugin,
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
};
