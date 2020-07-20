'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "orders",
      [
        {
          userId: 1,
          courseId: 1,
          transactionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          courseId: 2,
          transactionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          courseId: 2,
          transactionId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          courseId: 1,
          transactionId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          courseId: 2,
          transactionId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },


      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orders", null, {});
  }
};
