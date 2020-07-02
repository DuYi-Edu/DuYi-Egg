const Service = require("egg").Service;

module.exports = class extends Service {
  async getProvinces() {
    const resp = await this.app.axios.get(`${this.config.$apiBase}/api/local`);
    return resp.data;
  }
};
