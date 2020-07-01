module.exports = (options, app) => {
  // options是针对该中间件的配置，app是egg全局应用对象
  return async function (ctx, next) {
    console.log("中间件开始", options);
    await next();
    console.log("中间件结束", options);
  };
};
