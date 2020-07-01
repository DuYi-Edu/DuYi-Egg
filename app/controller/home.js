const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    const resp = await this.app.axios.get(`${this.config.$apiBase}/api/local`);
    var model = {
      title: "首页",
      provinces: resp.data,
    };
    await this.ctx.render("home", model);
  }
};
