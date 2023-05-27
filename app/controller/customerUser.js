// app/controller/customerUser.js
'use strict';
// 其中，index、new、create和show对应HTTP GET请求，edit、update和destroy对应HTTP PUT、PATCH和DELETE请求。
const Controller = require('egg').Controller;
const uuid = require('uuid/v4');
class CustomerUserController extends Controller {
  async index() {
    const { ctx } = this;
    const users = await ctx.model.CustomerUser.findAll();
    ctx.body = users;
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await ctx.model.CustomerUser.findByPk(id);
    if (!user) {
      ctx.status = 204;
      ctx.body = { error: 'User not found' };
      return;
    }
    ctx.body = user;
  }

  async create() {
    const { ctx } = this;
    const { name, phone } = ctx.request.body;

    // 检查手机号是否已存在
    const existingUser = await ctx.model.CustomerUser.findOne({ where: { phone } });
    if (existingUser) {
      ctx.status = 204;
      ctx.body = { error: 'Phone number already exists' };
      return;
    }

    // 创建新用户
    const user = await ctx.model.CustomerUser.create({ name, phone });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const { ctx } = this;
    const { id, name, phone } = ctx.request.body;
    // 更新用户信息
    const user = await ctx.model.CustomerUser.findByPk(id);
    if (!user) {
      ctx.status = 204;
      ctx.body = { error: 'User not found' };
      return;
    }
    user.name = name || user.name;
    user.phone = phone || user.phone;
    await user.save();

    ctx.body = user;
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await ctx.model.CustomerUser.findByPk(id);
    if (!user) {
      ctx.status = 204;
      ctx.body = { error: 'User not found' };
      return;
    }
    await user.destroy();
    ctx.body = user;
  }

  async addIntegral() {
    const { ctx } = this;
    const { id, integral } = ctx.request.body;
    const user = await ctx.model.CustomerUser.findByPk(id);
    if (!user) {
      ctx.status = 204;
      ctx.body = { error: 'User not found' };
      return;
    }
    user.integral += integral;
    await user.save();
    ctx.body = user;
  }

  async addOrderCount() {
    const { ctx } = this;
    const { id } = ctx.params;
    const user = await ctx.model.CustomerUser.findByPk(id);
    if (!user) {
      ctx.status = 204;
      ctx.body = { error: 'User not found' };
      return;
    }
    user.orderCount += 1;
    await user.save();
    ctx.body = user;
  }
}

module.exports = CustomerUserController;
