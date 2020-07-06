const Service = require("egg").Service;

module.exports = class extends Service {
  async getProvinces() {
    const provinces = await this.app.redis.get("province");
    return JSON.parse(provinces);
  }
};
