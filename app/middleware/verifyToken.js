// 鉴权的中间件

module.exports = (options, app) => {
  return async function (ctx, next) {
    // 你能不能进入首页
    if (ctx.session.user) {
      ctx.locals.user = ctx.session.user;
    } else {
      ctx.redirect("/login");
      return;
    }
    await next();
  };
};
