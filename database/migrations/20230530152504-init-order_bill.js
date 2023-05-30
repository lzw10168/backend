'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, DECIMAL } = Sequelize;
    await queryInterface.createTable('order_bill', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 订单号
      order_number: STRING(30),
      // 流水号
      serial_number: STRING(30),
      // 财务类型
      finance_type: INTEGER, // 0: 责任险, 1: 订单提成, 2: 保险, 3: 服务费, 
      // 流水金额, 2位小数
      serial_amount: DECIMAL(10, 2),
      // 对象
      driver_name: STRING(30), // 司机姓名
      // 完成时间
      finish_time: DATE,
      // 备注
      remark: STRING(1000),
      // 订单公司
      order_company: INTEGER, //  0: 百色时间, 
      // 司机公司
      driver_company: INTEGER, // 0: 百色时间,
      // 业务类型
      business_type: INTEGER, // 0: 代驾, 
      created_at: DATE,
      updated_at: DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_bill');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
