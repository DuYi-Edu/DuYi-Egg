const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    await this.ctx.render("error", { title: "错误页面" });
  }

  async notFound() {
    await this.ctx.render("404", { title: "页面找不到" });
  }
};
