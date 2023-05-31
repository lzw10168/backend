'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('admin_users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键',
      },
      username: {
        type: STRING(30),
        allowNull: false,
        comment: '用户名',
      },
      password: {
        type: STRING(128),
        allowNull: false,
        comment: '密码',
      },
      super: {
        type: INTEGER,
        allowNull: false,
        comment: '管理员类型，0: 普通管理员, 1: 超级管理员',
      },
      status: {
        type: INTEGER,
        allowNull: false,
        comment: '状态，0: 禁用, 1: 启用',
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
    await queryInterface.dropTable('admin_users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
