'use strict';
// index、new、create、show、edit、update和destroy等7个请求处理方法。
// 其中，index、new、create和show对应HTTP GET请求，edit、update和destroy对应HTTP PUT、PATCH和DELETE请求。
const Controller = require('egg').Controller;
const uuid = require('uuid');
class DriverUserController extends Controller {
  async index() {
    const { ctx } = this;
    const driverUser = await ctx.model.DriverUser.findAll();
    ctx.body = driverUser;
  }

  async show() {
    const { ctx } = this;
    const driverUser = await ctx.model.DriverUser.findByPk(ctx.params.id);
    if (!driverUser) {
      ctx.status = 204;
      ctx.body = { error: 'Driver user not found' };
      return;
    }
    ctx.body = driverUser;
  }

  async create() {
    const { ctx } = this;
    // 给默认值
    const body = {
      // ID_5位随机数
      job_number: `ID_${uuid().slice(0, 5)}`,
      ...ctx.request.body
    }
    const driverUser = await ctx.model.DriverUser.create(body);
    ctx.status = 201;
    ctx.body = driverUser;
  }

  async update() {
    const { ctx } = this;
    const driverUser = await ctx.model.DriverUser.findByPk(ctx.params.id);
    if (!driverUser) {
      ctx.status = 204;
      ctx.body = { error: 'Driver user not found' };
      return;
    }
    await driverUser.update(ctx.request.body);
    ctx.body = driverUser;
  }

  async destroy() {
    const { ctx } = this;
    const driverUser = await ctx.model.DriverUser.findByPk(ctx.params.id);
    if (!driverUser) {
      ctx.status = 204;
      ctx.body = { error: 'Driver user not found' };
      return;
    }
    await driverUser.destroy();
    ctx.status = 204;
  }
}

module.exports = DriverUserController;
