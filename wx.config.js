const path = require("path");
module.exports = {
  inject: {
    title: "微风开发文档",
    favicon: "",
    logo: ""
  },
  cwd: path.resolve(__dirname, "./components"),
  groups: [
    {
      order: 2,
      title: "组件",
      route: "/components",
      basePath: "./"
    }
  ],
  webpack(config){
    config.resolve.alias['react-iaux'] = path.resolve(__dirname, './components');
    return config;
  }
};
