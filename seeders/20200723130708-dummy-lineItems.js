'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "lineItems",
      [
        {
          courseId: 1,
          orderId: 1,
          lineItemPrice: 21.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseId: 2,
          orderId: 1,
          lineItemPrice: 11.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseId: 3,
          orderId: 1,
          lineItemPrice: 41.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseId: 2,
          orderId: 2,
          lineItemPrice: 11.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseId: 3,
          orderId: 2,
          lineItemPrice: 41.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          courseId: 1,
          orderId: 3,
          lineItemPrice: 21.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    )
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
