'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DECIMAL } = Sequelize;
    await queryInterface.createTable('driver_users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 工号
      job_number: STRING(30),
      name: STRING(30),
      age: INTEGER,
      // 接单状态 0: 空闲 1: 接单中 2: 休息中
      receive_status: INTEGER,
      // 账户状态 0: 正常 1: 禁用 2: 待审核
      account_status: INTEGER,
      // 司机当前实时位置
      location: STRING(30),
      // 司机手机号
      phone: STRING(30),
      // 司机身份证号
      id_card: STRING(30),
      // 司机驾驶证号
      driver_license: STRING(30),
      // 身份证正面照片
      id_card_front: STRING(30),
      // 身份证反面照片
      id_card_back: STRING(30),
      // 驾驶证照片
      driver_license_img: STRING(30),
      // 余额
      balance: DECIMAL(10, 2),
      // 司机头像
      avatar: STRING(30),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface) => {
    await queryInterface.dropTable('driver_users');
  },
};
