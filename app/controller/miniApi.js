// app/controller/order.js
const Controller = require('egg').Controller;
const uuid = require('uuid');
const { genSuccessBody } = require('../utils');
class wxController extends Controller {
  async getUserInfo() {
    const { ctx } = this;
    try {
      const {
        code
      } = ctx.request.body;
      const res = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${ctx.app.config.wx.appid}&secret=${ctx.app.config.wx.secret}&js_code=${code}&grant_type=authorization_code&connect_redirect=1`, {
        dataType: 'json',
      });
      ctx.body = res.data;
      ctx.body = genSuccessBody(orders);
    } catch (error) {
      ctx.body = genErrorBody(error);
    }
  }


}

module.exports = wxController;
