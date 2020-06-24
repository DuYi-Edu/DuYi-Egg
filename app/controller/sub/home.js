const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "你好？！";
  }

  async login() {
    // 完成登录功能
    this.ctx.body = "登录";
  }
}

module.exports = HomeController;
