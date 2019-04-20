// vue.config.js
const path = require("path");
module.exports = {
  // 修改根目录
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 关闭生产环境 map 文件构建
  productionSourceMap: false,

  configureWebpack: {
    resolve: {
      // 引入别名
      alias: {
        "@": path.join(__dirname, "src/"),
        root: path.join(__dirname, "/")
      }
    }
  }
};
