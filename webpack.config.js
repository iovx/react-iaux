/* eslint no-param-reassign: 0 */
// This config is for building dist files
const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');

const { webpack } = getWebpackConfig;

function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function externalMoment(config) {
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
  config.externals['react-iaux'] = {
    root: 'react-iaux',
    commonjs2: 'react-iaux',
    commonjs: 'react-iaux',
    amd: 'react-iaux',
  };
  config.module.rules.push({
    test: /\.vx.svg/,
    use: {
      loader: 'svg-sprite-loader',
      options: {},
    },
  });

}


// function setLibraryName(config) {
//   config.output.library = 'iux';
// }
const webpackConfig = getWebpackConfig(false);
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);
  });
}

module.exports = webpackConfig;
