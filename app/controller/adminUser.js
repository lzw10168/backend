// app/controller/admin_user.js
const moment = require('moment');
const { genErrorBody, genSuccessBody } = require('../utils');
const Controller = require('egg').Controller;
const { Op } = require('sequelize');

class AdminUserController extends Controller {
  async index() {
    const { ctx } = this;
    const { pageNo, pageSize, username } = ctx.request.body;
    const where = {};
    if (username) {
      where.username = { $like: `%${username}%` };
    }
    try {
      const adminUsers = await ctx.model.AdminUser.findAndCountAll({
        attributes: { exclude: ['password'] },
        where,
        limit: Number(pageSize),
        offset: Number(pageNo - 1) * Number(pageSize)
      });
      ctx.body = genSuccessBody(adminUsers);
    } catch (e) {
      ctx.body = genErrorBody(e.message);
      console.log('e: ', e);
    }
  }

  async show() {
    const { ctx, app } = this;
    try {
      // 不查询密码
      let id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      id = decode.id
      const adminUser = await ctx.model.AdminUser.findByPk(id, {
        attributes: { exclude: ['password'] }
      });
      if (!adminUser) {
        ctx.status = 204;
        ctx.body = genErrorBody('Admin user not found');
        return;
      }
      ctx.body = genSuccessBody({
        ...adminUser.dataValues,
        permissions: ['admin']
      });
    } catch (e) {
      ctx.body = genErrorBody(e.message);
      console.log('e: ', e);
    }
  }

  async create() {
    const { ctx } = this;
    const { username, password, remark, status } = ctx.request.body;

    // 检查用户名是否已存在
    const existingUser = await ctx.model.AdminUser.findOne({
      where: { username }
    });
    if (existingUser) {
      ctx.status = 201;
      ctx.body = genErrorBody('账户名已被注册，请重新输入');
      return;
    }

    // 创建新管理员用户
    const adminUser = await ctx.model.AdminUser.create({
      username,
      password,
      remark,
      super: 0, // 普通管理员
      status // 禁用
    });
    ctx.status = 201;
    ctx.body = genSuccessBody(adminUser);
  }

  async update() {
    const { ctx } = this;
    const { id, username, password, status, remark } = ctx.request.body;

    // 更新管理员用户信息
    const adminUser = await ctx.model.AdminUser.findByPk(id);
    if (!adminUser) {
      ctx.status = 204;
      ctx.body = genErrorBody('没有找到这个管理员!');
      return;
    }
    await adminUser.update({
      username,
      password,
      status,
      remark
    });
    ctx.body = genSuccessBody(adminUser);
  }

  async destroy() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    try {
      if (ids) {
        const idArr = String(ids).split(',');
        idArr.forEach(async id => {
          const adminUser = await ctx.model.AdminUser.findByPk(id);
          if (adminUser) {
            await adminUser.destroy();
          }
        });
        ctx.body = genSuccessBody('删除成功!');
      }
    } catch (error) {
      ctx.body = genErrorBody(error);
      console.log('error: ', error);
    }
  }

  async login() {
    // app 为全局属性，相当于所有的插件方法都植入到了 app 对象
    const { ctx, app } = this;
    console.log('ctx.request.body: ', ctx.request.body);
    const { username, password } = ctx.request.body;
    // 根据用户名，在数据库查找相对应的id操作
    const userInfo = await ctx.model.AdminUser.findOne({ where: { username } });
    // 没找到说明没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.body = genErrorBody('用户不存在!');

      return;
    }

    if (userInfo && userInfo.status == 0) {
      ctx.body = genErrorBody('用户被禁用, 请联系管理员!');
      return;
    }

    if (userInfo && password != userInfo.password) {
      ctx.body = genErrorBody('密码错误!');
      return;
    }

    // 生成 token 加盐
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // token 有效期为 24 小时
      },
      app.config.jwt.secret
    );

    ctx.body = genSuccessBody({ ...userInfo, token: token });
  }
  async logout() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return;
    ctx.body = genSuccessBody('退出成功');
  }
  async modifyPass() {
    const { ctx, app } = this;
    const { old_pass = '', new_pass = '' } = ctx.request.body;

    try {
      let user_id;
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      // if (decode.super == 1) {
      //   ctx.body = genErrorBody('超级管理员不允许修改密码!');
      //   return
      // }
      user_id = decode.id;
      const userInfo = await ctx.model.AdminUser.findOne({
        where: { id: user_id }
      });

      if (old_pass != userInfo.password) {
        ctx.body = genErrorBody('原密码错误!');
        return;
      }

      await userInfo.update({
        password: new_pass
      });

      ctx.body = genSuccessBody('密码修改成功!');
    } catch (error) {
      ctx.body = genErrorBody('密码修改失败!');
    }
  }
  // // 激活管理员
  // async activeUser() {
  //   const { ctx, app } = this;
  //   const { id } = ctx.request.body;
  //   try {
  //     const userInfo = await ctx.model.AdminUser.findOne({ where: { id } });
  //     if (!userInfo) {
  //       ctx.body = genErrorBody('没有找到这个管理员!');
  //       return;
  //     }
  //     await userInfo.update({
  //       status: 1
  //     });
  //     ctx.body = genSuccessBody('激活成功!');
  //   } catch (error) {
  //     ctx.body = genErrorBody('激活失败!');
  //   }
  // }
  // // 禁用管理员
  // async disableUser() {
  //   const { ctx, app } = this;
  //   const { id } = ctx.request.body;
  //   try {
  //     const userInfo = await ctx.model.AdminUser.findOne({ where: { id } });
  //     if (!userInfo) {
  //       ctx.body = genErrorBody('没有找到这个管理员!');
  //       return;
  //     }
  //     await userInfo.update({
  //       status: 0
  //     });
  //     ctx.body = genSuccessBody('禁用成功!');
  //   } catch (error) {
  //     ctx.body = genErrorBody('禁用失败!');
  //   }
  // }
  async verify() {
    const { ctx, app } = this;
    const { token } = ctx.request.body;
    console.log(ctx.state.user);
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    ctx.body = genSuccessBody('验证成功!');
  }
}

module.exports = AdminUserController;
