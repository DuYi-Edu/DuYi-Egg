const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    const model = {
      user: this.ctx.state.user,
    };
    const resp2 = await this.app.axios.get(`${this.config.$apiBase}/api/local`);
    model.provinces = resp2.data;
    await this.ctx.render("home", { title: "首页 - 地区数据库", ...model });
  }

  async css() {
    console.log(this.app.middleware);
    const view = await this.ctx.renderView("css.ejs", {
      isBlackAndWhite: !!this.ctx.query.special,
    });
    this.ctx.body = view;
    this.ctx.type = "text/css";
  }
};
