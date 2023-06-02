'use strict';
// index、new、create、show、edit、update和destroy等7个请求处理方法。
// 其中，index、new、create和show对应HTTP GET请求，edit、update和destroy对应HTTP PUT、PATCH和DELETE请求。
const Controller = require('egg').Controller;
const uuid = require('uuid');
const { successB, errorB } = require('../utils');
class DriverUserController extends Controller {
  async index() {
    const { ctx } = this;
    try {
    const driverUser = await ctx.model.DriverUser.findAll();
    ctx.body = successB(driverUser);
    } catch (error) {
      ctx.body = successB(error);
    }
    
  }

  async show() {
    const { ctx } = this;
    try {
      const driverUser = await ctx.model.DriverUser.findByPk(ctx.params.id);
      if (!driverUser) {
        ctx.status = 204;
        ctx.body = { error: 'Driver user not found' };
        return;
      }
      ctx.body = successB(driverUser);
    } catch (error) {
      ctx.body = errorB(error);
    }

  }

  async create() {
    const { ctx } = this;
    try {
      // 给默认值
      const body = {
        ...ctx.request.body,
        // ID_5位大写英文
        job_number: `ID_${uuid.v4().toUpperCase().slice(0, 5)}`,
        receive_status: 3, //休息中
        account_status: 1, //禁用
      }
      const driverUser = await ctx.model.DriverUser.create(body);
      ctx.status = 201;
      ctx.body = successB(driverUser);
    } catch (error) {
      ctx.body = errorB(error);
    }

  }

  async update() {
    const { ctx } = this;
    try {
      const driverUser = await ctx.model.DriverUser.findByPk(ctx.params.id);
    if (!driverUser) {
      ctx.status = 204;
      ctx.body = errorB('Driver user not found');
      return;
    }
    await driverUser.update(ctx.request.body);
    ctx.body = successB(driverUser);
    } catch (error) {
      ctx.body = errorB(error);
      
    }
  }

  async destroy() {
    const { ctx } = this;
    try {
      const driverUser = await ctx.model.DriverUser.findByPk(ctx.params.id);
    if (!driverUser) {
      ctx.status = 204;
      ctx.body = errorB('Driver user not found');
      return;
    }
    await driverUser.destroy();
    ctx.status = 204;
    ctx.body = successB('删除成功')
    } catch (error) {
      ctx.body = errorB(error);
      
    }
  }
}

module.exports = DriverUserController;
