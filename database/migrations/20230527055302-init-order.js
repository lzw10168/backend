'use strict';
// 订单
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, DECIMAL } = Sequelize;

    await queryInterface.createTable('orders', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键',
      },
      order_number: {
        type: STRING(30),
        comment: '订单号，随机生成的25位订单号',
      },
      order_type: {
        type: INTEGER,
        comment: '订单类型，0: 实时单, 1: 预约单',
      },
      order_status: {
        type: INTEGER,
        comment: '订单状态，0: 待接单, 1: 已接单, 2: 已完成, 3: 已取消',
      },
      appointment_time: {
        type: DATE,
        comment: '预约时间',
      },
      appointment_address: {
        type: STRING(30),
        comment: '预约地址',
      },
      appointment_longitude: {
        type: STRING(30),
        comment: '预约地址经度',
      },
      appointment_latitude: {
        type: STRING(30),
        comment: '预约地址纬度',
      },
      destination: {
        type: STRING(30),
        comment: '目的地',
      },
      destination_longitude: {
        type: STRING(30),
        comment: '目的地经度',
      },
      destination_latitude: {
        type: STRING(30),
        comment: '目的地纬度',
      },
      appointment_user_id: {
        type: INTEGER,
        comment: '预约人ID',
      },
      appointment_user: {
        type: STRING(30),
        comment: '预约人姓名',
      },
      appointment_phone: {
        type: STRING(30),
        comment: '预约人电话',
      },
      use_phone: {
        type: STRING(30),
        comment: '使用人号码',
      },
      assign_driver_id: {
        type: INTEGER,
        comment: '指派司机ID',
      },
      assign_driver_name: {
        type: STRING(30),
        comment: '指派司机姓名',
      },
      order_amount: {
        type: DECIMAL(10, 2),
        comment: '订单金额',
      },
      order_remark: {
        type: STRING(30),
        comment: '订单备注',
      },
      created_at: {
        type: DATE,
        comment: '订单创建时间',
      },
      updated_at: {
        type: DATE,
        comment: '订单更新时间',
      },
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
