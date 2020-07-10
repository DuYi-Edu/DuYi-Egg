const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    this.ctx.helper.sayHello();
    await this.ctx.render("index.html");
  }
};
