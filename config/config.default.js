const path = require("path");
exports.keys = "duyi.com";

exports.view = {
  // 该配置会被 egg-view 读取
  mapping: {
    // 映射配置，将不同的模板后缀映射到对应的模板引擎处理
    ".ejs": "ejs",
  },
  defaultViewEngine: "ejs", //如果映射找不到对应的模板引擎，将使用该值作为默认使用的模板引擎
  defaultExtension: ".ejs", //后续在controller中渲染模板时，默认渲染的模板后缀名
};

// 安全配置
exports.security = {
  csrf: {
    enable: false,
  },
};

// 配置redis
exports.redis = {
  client: {
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    password: "",
    db: 0,
  },
};

exports.cluster = {
  listen: {
    port: 7000,
  },
};

// 与日志相关的配置
exports.logger = {
  dir: path.resolve(__dirname, "../logs"),
  appLogName: "duyi-app-web.log",
  level: "DEBUG",
  outputJSON: true,
};

exports.customLogger = {
  scheduleLogger: {
    file: path.resolve(__dirname, "../logs/schedule.log"),
  },
};

exports.$apiBase = "http://study.yuanjin.tech";
