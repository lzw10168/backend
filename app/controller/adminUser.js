// app/controller/admin_user.js
class AdminUserController extends Controller {
  async index() {
    const { ctx } = this;
    const adminUsers = await ctx.model.AdminUser.findAll();
    ctx.body = adminUsers;
  }

  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const adminUser = await ctx.model.AdminUser.findByPk(id);
    if (!adminUser) {
      ctx.status = 204;
      ctx.body = { error: 'Admin user not found' };
      return;
    }
    ctx.body = adminUser;
  }

  async create() {
    const { ctx } = this;
    const {
      username,
      password,
      status,
      remark,
    } = ctx.request.body;

    // 检查用户名是否已存在
    const existingUser = await ctx.model.AdminUser.findOne({ where: { username } });
    if (existingUser) {
      ctx.status = 204;
      ctx.body = { error: '账户名已被注册，请重新输入' };
      return;
    }

    // 创建新管理员用户
    const adminUser = await ctx.model.AdminUser.create({
      username,
      password,
      super: 0,
      status,
      remark,
    });
    ctx.status = 201;
    ctx.body = adminUser;
  }

  async update() {
    const { ctx } = this;
    const {
      id,
      username,
      password,
      status,
      remark,
    } = ctx.request.body;

    // 更新管理员用户信息
    const adminUser = await ctx.model.AdminUser.findByPk(id);
    if (!adminUser) {
      ctx.status = 204;
      ctx.body = { error: '没有找到这个管理员!' };
      return;
    }
    await adminUser.update({
      username,
      password,
      status,
      remark,
    });
    ctx.body = adminUser;
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const adminUser = await ctx.model.AdminUser.findByPk(id);
    if (!adminUser) {
      ctx.status = 204;
      ctx.body = { error: 'Admin user not found' };
      return;
    }
    await adminUser.destroy();
    ctx.status = 204;
  }


  async login() {
    // app 为全局属性，相当于所有的插件方法都植入到了 app 对象
    const { ctx, app } = this;
    const { username, password } = ctx.request.body
    // 根据用户名，在数据库查找相对应的id操作
    const userInfo = await ctx.model.AdminUser.findOne({ where: { username } })
    // 没找到说明没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.body = { error: '账号不存在!' };

      return
    }

    if (userInfo && password != userInfo.password) {
      ctx.body = { error: '密码错误!' };
      return
    }

    // 生成 token 加盐
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // token 有效期为 24 小时
    }, app.config.jwt.secret);

    ctx.body = { ...userInfo, token: token }
  }
  async modifyPass() {
    const { ctx, app } = this;
    const { old_pass = '', new_pass = '', new_pass2 = '' } = ctx.request.body

    try {
      let user_id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return
      if (decode.super == 1) {
        ctx.body = { error: '超级管理员不允许修改密码!' };
        return
      }
      user_id = decode.id
      const userInfo = await ctx.model.AdminUser.findOne({ where: { id: user_id } })

      if (old_pass != userInfo.password) {
        ctx.body = { error: '原密码错误!' };
        return
      }

      if (new_pass != new_pass2) {
        ctx.body = { error: '两次密码不一致!' };
        return
      }

      await userInfo.update({
        password: new_pass
      });



      ctx.body = userInfo
    } catch (error) {
      ctx.body = { error: '密码修改失败!' };
    }
  }
  async verify() {
    const { ctx, app } = this;
    const { token } = ctx.request.body
    console.log(ctx.state.user)
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    console.log('decode', decode)
    ctx.body = 'success gays'
  }
}

module.exports = AdminUserController;

