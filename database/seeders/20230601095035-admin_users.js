'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('admin_users', [{
        username: 'admin',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        super: 1,
        status: 1,
     }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admin_users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
