
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, DECIMAL } = Sequelize;
    await queryInterface.createTable('driver_bill', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      serial_number: {
        type: STRING(30),
        allowNull: false,
        comment: '流水号',
      },
      finance_type: {
        type: INTEGER,
        allowNull: false,
        comment: '财务类型，0: 支出, 1: 收入',
      },
      serial_amount: {
        type: DECIMAL(10, 2),
        allowNull: false,
        comment: '流水金额，2位小数',
      },
      driver_name: {
        type: STRING(30),
        allowNull: false,
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
      created_at: {
        type: DATE,
        allowNull: false,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        comment: '更新时间',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('driver_bill');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
   **/ 
  }

};
