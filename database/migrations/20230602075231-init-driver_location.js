
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, DECIMAL } = Sequelize;
    await queryInterface.createTable('driver_location', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      driver_id: {
        type: INTEGER,
        allowNull: false,
      },
      longitude: {
        type: STRING(100),
        allowNull: false,
        comment: '经度',
      },
      latitude: {
        type:  STRING(100),
        allowNull: false,
        comment: '纬度',
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
    await queryInterface.dropTable('driver_location');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
   **/ 
  }

};
