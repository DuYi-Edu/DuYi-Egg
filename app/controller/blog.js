const Controller = require("egg").Controller;

class BlogController extends Controller {
  async index() {
    this.ctx.body = "获取博客列表";
  }

  async new() {
    // 完成登录功能
    this.ctx.body = "新增博客的表单";
  }

  async show() {
    this.ctx.body = "博客详情";
  }

  async edit() {
    this.ctx.body = "博客编辑页面";
  }

  async create() {
    this.ctx.body = "处理新增的博客内容";
  }

  async update() {
    this.ctx.body = "处理提交的修改博客的内容";
  }

  async delete() {
    this.ctx.body = "处理删除博客";
  }
}

module.exports = BlogController;
