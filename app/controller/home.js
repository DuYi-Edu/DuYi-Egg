const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    // 你能不能进入首页
    const token = this.ctx.cookies.get("token");
    if (!token) {
      this.ctx.redirect("/login");
      return;
    }
    const resp = await this.app.axios.get(
      `${this.config.$apiBase}/api/user/whoami`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (resp.data.code) {
      // 登录过期或被篡改
      this.ctx.redirect("/login");
      return;
    }
    const model = {
      user: resp.data.data,
    };
    const resp2 = await this.app.axios.get(`${this.config.$apiBase}/api/local`);
    model.provinces = resp2.data;
    await this.ctx.render("home", { title: "首页 - 地区数据库", ...model });
  }
};
