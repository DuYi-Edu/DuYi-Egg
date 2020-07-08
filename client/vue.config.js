// client/vue.config.js
const path = require("path");
module.exports = {
  // 选项...
  outputDir: path.resolve(__dirname, "../app/public"),
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7000",
      },
    },
  },
};
