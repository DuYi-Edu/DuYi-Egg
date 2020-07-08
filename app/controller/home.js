const Controller = require("egg").Controller;

module.exports = class extends Controller {
  async index() {
    const value = `<a t=1 title="a" href="http://www.domain.com">google</a><script>evilcode…</script>`;
    console.log(this.ctx.helper.shtml(value));

    const provinces = await this.service.local.getProvinces();
    var model = {
      title: "首页",
      provinces,
    };
    await this.ctx.render("home", model);
  }
};
