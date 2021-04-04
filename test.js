const path = require("path");

const config = require('./wx.config');

function getContextPathOfMd(cwd, basePath) {
  const src = path.resolve(cwd, basePath);
  return path.relative(cwd, src).replace(/\\/g, '/');
}


console.log(getContextPathOfMd(config.cwd, path.resolve(config.cwd, config.groups[0].basePath)))
