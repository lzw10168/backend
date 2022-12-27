'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html', {
      title: 'hi 空杯' // 将 title 传入 index.html
    });
  }
}
module.exports = HomeController;
