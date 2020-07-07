const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    this.ctx.logger.debug("不要访问首页");
    const provinces = await this.service.local.getProvinces();
    var model = {
      title: "首页",
      provinces,
    };
    await this.ctx.render("home", model);
  }
};
