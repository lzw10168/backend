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
     await queryInterface.bulkInsert('bussiness_set', [{
      open_time: '00:00:00',
      end_time: '23:59:59',
      normal_start_km: 7,
      normal_start_price: 30,
      special_start_km: 7,
      special_start_price: 40,
      exceed_km: 1,
      exceed_per_price: 5,
      wait_time: 1,
      wait_per_price: 1,
     }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('bussiness_set', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
