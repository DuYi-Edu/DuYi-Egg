const Controller = require("egg").Controller;

module.exports = class extends Controller {
  // 提供登录页面
  async login() {
    const model = {
      title: "登录 - 地区数据库",
      error: "",
      loginId: "",
    };
    await this.ctx.render("login", model);
  }

  // 处理登录
  async handleLogin() {
    const url = `${this.config.$apiBase}/api/user/login`;
    const resp = await this.app.axios.post(url, this.ctx.request.body);
    if (resp.data.code) {
      // 登录失败
      const model = {
        title: "登录 - 地区数据库",
        error: resp.data.msg,
        loginId: this.ctx.request.body.loginId,
      };
      await this.ctx.render("login", model);
    } else {
      const token = resp.headers.authorization;
      this.ctx.cookies.set("token", token);
      this.ctx.redirect("/");
    }
  }
};
