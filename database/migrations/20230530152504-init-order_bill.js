'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, DECIMAL } = Sequelize;
    await queryInterface.createTable('order_bill', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键',
      },
      order_number: {
        type: STRING(30),
        allowNull: true,
        comment: '订单号',
      },
      serial_number: {
        type: STRING(30),
        allowNull: true,
        comment: '流水号',
      },
      finance_type: {
        type: INTEGER,
        allowNull: true,
        comment: '财务类型，0: 责任险, 1: 订单提成, 2: 保险, 3: 服务费',
      },
      serial_amount: {
        type: DECIMAL(10, 2),
        allowNull: true,
        comment: '流水金额，2位小数',
      },
      driver_name: {
        type: STRING(30),
        allowNull: true,
        comment: '司机姓名',
      },
      finish_time: {
        type: DATE,
        allowNull: true,
        comment: '完成时间',
      },
      remark: {
        type: STRING(1000),
        allowNull: true,
        comment: '备注',
      },
      order_company: {
        type: INTEGER,
        allowNull: true,
        comment: '订单公司，0: 百色时间',
      },
      driver_company: {
        type: INTEGER,
        allowNull: true,
        comment: '司机公司，0: 百色时间',
      },
      business_type: {
        type: INTEGER,
        allowNull: true,
        comment: '业务类型，0: 代驾',
      },
      created_at: {
        type: DATE,
        allowNull: true,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        allowNull: true,
        comment: '更新时间',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_bill');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
   **/ 
  }

};
