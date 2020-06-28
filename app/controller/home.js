const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render("home", { title: "服务端渲染的页面" });
    // const html = await this.ctx.renderView("home", { title: "aaaaa" });
    // this.ctx.body = html;

    // const html = await this.ctx.renderString("标题：<%= title %>", {
    //   title: "aaaaa",
    // });
    // this.ctx.body = html;
  }
}

module.exports = HomeController;
