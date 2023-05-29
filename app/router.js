'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt);
  router.get('/', controller.home.index);
  // router.post('/api/user/login', controller.user.login);
  // router.post('/api/user/register', controller.user.register);
  // router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo); // 获取用户信息
  // router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // 修改用户个性签名
  // router.post('/api/user/modify_pass', _jwt, controller.user.modifyPass); // 修改用户密码
  // router.get('/api/type/list', _jwt, controller.type.list); // 获取消费类型列表
  // router.get('/api/bill/list', _jwt, controller.bill.list); // 获取账单列表
  // router.post('/api/bill/add', _jwt, controller.bill.add); // 添加账单
  // router.get('/api/bill/detail', _jwt, controller.bill.detail); // 获取详情
  // router.post('/api/bill/update', _jwt, controller.bill.update); // 账单更新
  // router.post('/api/bill/delete', _jwt, controller.bill.delete); // 获取详情
  // router.get('/api/bill/data', _jwt, controller.bill.data); // 获取数据
  // router.get('/api/note/list', _jwt, controller.note.list); // 获取笔记列表
  // router.post('/api/note/add', _jwt, controller.note.add); // 新增笔记
  // router.post('/api/note/delete', _jwt, controller.note.delete); // 删除笔记
  // router.post('/api/note/update', _jwt, controller.note.update); // 修改笔记
  router.post('/api/upload', _jwt, controller.upload.upload); // 上传图片
  // 司机用户
  router.get('/driver_user', controller.driverUser.index);
  router.get('/driver_user/get', controller.driverUser.show);
  router.post('/driver_user/create', controller.driverUser.create);
  router.post('/driver_user/update', controller.driverUser.update);
  router.post('/driver_user/delete', controller.driverUser.destroy);

  // 客户
  router.get('/customer_user', controller.customerUser.index);
  router.get('/customer_user/get', controller.customerUser.show);
  router.post('/customer_user/create', controller.customerUser.create);
  router.post('/customer_user/update', controller.customerUser.update);
  router.post('/customer_user/delete', controller.customerUser.destroy);
  router.post('/customer_user/add_integral', controller.customerUser.addIntegral);
  router.post('/customer_user/add_order_count', controller.customerUser.addOrderCount);

  // 登录
  router.post('/adminUser/login', controller.adminUser.login);
  router.post('/adminUser/logout', controller.adminUser.logout);
  router.post('/adminUser/modify_pass', controller.adminUser.modifyPass);
  router.get('/adminUser', controller.adminUser.index);
  router.get('/adminUser/get', controller.adminUser.show);
  router.post('/adminUser/create', controller.adminUser.create);
  router.post('/adminUser/update', controller.adminUser.update);
  router.post('/adminUser/delete', controller.adminUser.destroy);

};
