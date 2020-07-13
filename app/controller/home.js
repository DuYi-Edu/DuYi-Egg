module.exports = class extends require("egg").Controller {
  async index() {
    const model = {};
    if (this.ctx.isAuthenticated()) {
      // 已经授权过了
      model.isLogin = true;
    } else {
      model.isLogin = false;
    }
    await this.ctx.render("home.ejs", model);
  }

  async loginOut() {
    await this.ctx.logout();
    this.ctx.redirect("/");
  }
};
