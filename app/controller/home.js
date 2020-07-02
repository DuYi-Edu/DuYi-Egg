const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    const provinces = await this.service.local.getProvinces();
    var model = {
      title: "首页",
      provinces
    };
    await this.ctx.render("home", model);
  }
};
