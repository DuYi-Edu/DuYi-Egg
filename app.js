// egg创建好了 app 之后，如果存在此文件，并且是一个方法，则其会自动运行该方法一次
module.exports = (app) => {
  app.axios = require("axios").default;
};
