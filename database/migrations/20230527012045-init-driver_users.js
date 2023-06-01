'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DECIMAL } = Sequelize;
    await queryInterface.createTable('driver_users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键',
      },
      job_number: {
        type: STRING(30),
        comment: '工号',
      },
      // 昵称
      nick_name: {
        type: STRING(30),
        comment: '昵称',
      },
      name: {
        type: STRING(30),
        comment: '姓名',
      },
      age: {
        type: INTEGER,
        comment: '年龄',
      },
      receive_status: {
        type: INTEGER,
        comment: '接单状态，0: 空闲 1: 创单,等待中 2: 接单中 3: 休息中',
      },
      account_status: {
        type: INTEGER,
        comment: '账户状态，0: 正常 1: 禁用 2: 待审核',
      },
      location: {
        type: STRING(30),
        comment: '司机当前实时位置',
      },
      phone: {
        type: STRING(30),
        comment: '手机号',
      },
      id_card: {
        type: STRING(30),
        comment: '身份证号',
      },
      driver_license: {
        type: STRING(30),
        comment: '驾驶证号',
      },
      id_card_front: {
        type: STRING(30),
        comment: '身份证正面照片',
      },
      id_card_back: {
        type: STRING(30),
        comment: '身份证反面照片',
      },
      driver_license_img: {
        type: STRING(30),
        comment: '驾驶证照片',
      },
      balance: {
        type: DECIMAL(10, 2),
        comment: '余额',
      },
      avatar: {
        type: STRING(30),
        comment: '司机头像',
      },
      created_at: {
        type: DATE,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        comment: '更新时间',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface) => {
    await queryInterface.dropTable('driver_users');
  },
};
