// 鉴权的中间件

module.exports = (options, app)=>{
  return async function (ctx, next){
    // 你能不能进入首页
    const token = ctx.cookies.get("token");
    if (!token) {
      ctx.redirect("/login");
      return;
    }
    const resp = await app.axios.get(
      `${app.config.$apiBase}/api/user/whoami`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.data.code) {
      // 登录过期或被篡改
      ctx.redirect("/login");
      return;
    }
    ctx.locals.user = resp.data.data;
    await next();
  }
}