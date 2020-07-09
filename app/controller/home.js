const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    console.log(this.app.foo());
    await this.ctx.render("index.html");
  }
};
