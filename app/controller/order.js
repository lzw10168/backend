// app/controller/order.js
const Controller = require('egg').Controller;
const uuid = require('uuid/v4');
class OrderController extends Controller {
  async index() {
    const { ctx } = this;
    const orders = await ctx.model.Order.findAll();
    ctx.body = orders;
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const order = await ctx.model.Order.findByPk(id);
    if (!order) {
      ctx.status = 204;
      ctx.body = { error: 'Order not found' };
      return;
    }
    ctx.body = order;
  }

  async create() {
    const { ctx } = this;
    const {
    } = ctx.request.body;

    // 设置默认的25位订单随机数
    const order_number = Math.random().toString(36).substr(2, 25);
    // 创建新订单
    const order = await ctx.model.Order.create({
      ...ctx.request.body,
      order_number,
    });
    ctx.status = 201;
    ctx.body = order;
  }

  async update() {
    const { ctx } = this;
    const {
      order_number,

    } = ctx.request.body;

    // 检查订单号是否已存在
    const existingOrder = await ctx.model.Order.findOne({ where: { order_number } });
    // 不存在报错
    if (!existingOrder) {
      ctx.status = 204;
      ctx.body = { error: 'Order number not exists' };
      return
    }

    // 更新订单信息
    const order = await ctx.model.Order.findByPk(id);
    if (!order) {
      ctx.status = 204;
      ctx.body = { error: 'Order not found' };
      return;
    }
    await order.update({
      ...ctx.request.body
    });
    ctx.body = order;
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const order = await ctx.model.Order.findByPk(id);
    if (!order) {
      ctx.status = 204;
      ctx.body = { error: 'Order not found' };
      return;
    }
    await order.destroy();
    ctx.status = 204;
  }
}

module.exports = OrderController;
