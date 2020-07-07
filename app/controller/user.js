const Controller = require("egg").Controller;

module.exports = class extends Controller {
  // 提供登录页面
  async login() {
    const model = {
      title: "登录",
      error: "",
      loginId: "",
    };
    await this.ctx.render("login", model);
  }

  // 处理登录
  async handleLogin() {
    const result = await this.service.user.login(
      this.ctx.request.body.loginId,
      this.ctx.request.body.loginPwd
    );
    if (result) {
      // 登录成功
      this.ctx.session.user = result.user;
      // if(用户选择了7天保持登录){
      //   this.ctx.session.maxAge = 7 * 24 * 3600 * 1000;
      // }
      this.ctx.redirect("/");
    } else {
      const model = {
        title: "登录",
        error: "账号或密码不正确",
        loginId: this.ctx.request.body.loginId,
      };
      await this.ctx.render("login", model);
    }
  }
};
