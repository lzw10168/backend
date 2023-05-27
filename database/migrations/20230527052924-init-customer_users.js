'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('customer_users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      // 工号
      job_number: STRING(30),
      name: STRING(30),
      phone: STRING(30),
      // 等级
      level: INTEGER, // 0: 普通用户 1: VIP用户
      // 积分
      integral: INTEGER,
      // 注册渠道
      channel: INTEGER, // 0: 司机补单 1: 后台下单
      // 所属公司
      company: STRING(30),
      // 完成订单数
      order_count: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customer_users');

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
