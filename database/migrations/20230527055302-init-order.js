'use strict';
// 订单
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;

    await queryInterface.createTable('orders', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 订单号
      order_number: STRING(30), // 需要随机生成25位订单号
      // 订单类型
      order_type: INTEGER, // 0: 实时单 1: 预约单
      // 订单状态
      order_status: INTEGER, // 0: 待接单 1: 已接单 2: 已完成 3: 已取消
      // 预约时间
      appointment_time: DATE,
      // 预约地址
      appointment_address: STRING(30),
      // 预约经度
      appointment_longitude: STRING(30),
      // 预约纬度
      appointment_latitude: STRING(30),
      // 目的地
      destination: STRING(30),
      // 目的地经度
      destination_longitude: STRING(30),
      // 目的地纬度
      destination_latitude: STRING(30),
      // 预约人id
      appointment_user_id: INTEGER,
      // 预约人
      appointment_user: STRING(30),
      // 预约人电话
      appointment_phone: STRING(30),
      // 使用人号码
      use_phone: STRING(30),
      // 指派司机id
      assign_driver_id: INTEGER,
      // 指派司机姓名
      assign_driver_name: STRING(30),
      // 订单金额
      order_amount: INTEGER,
      // 订单备注
      order_remark: STRING(30),
      // 订单创建时间
      created_at: DATE,
      // 订单更新时间
      updated_at: DATE,

    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
