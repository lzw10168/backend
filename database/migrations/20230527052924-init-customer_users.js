'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('customer_users', {
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
      name: {
        type: STRING(30),
        comment: '姓名',
      },
      phone: {
        type: STRING(30),
        comment: '电话',
      },
      level: {
        type: INTEGER,
        comment: '等级，0: 普通用户, 1: VIP用户',
      },
      integral: {
        type: INTEGER,
        comment: '积分',
      },
      channel: {
        type: INTEGER,
        comment: '注册渠道，0: 司机补单, 1: 后台下单',
      },
      company: {
        type: INTEGER,
        comment: '公司，0: 百色时间',
      },
      order_count: {
        type: INTEGER,
        comment: '完成订单数',
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
