// 鉴权的中间件

module.exports = (options, app) => {
  return async function (ctx, next) {
    // 你能不能进入首页
    const token = ctx.cookies.get("token");
    const user = await ctx.service.user.whoAmI(token);
    if (!user) {
      ctx.redirect("/login");
      return;
    }
    ctx.locals.user = user;
    await next();
  };
};
