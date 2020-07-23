'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "permissions",
      [
        {
          userId: 1,
          courseId: 1,
          orderId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          courseId: 2,
          orderId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          courseId: 2,
          orderId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          courseId: 1,
          orderId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          courseId: 2,
          orderId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },


      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("permissions", null, {});
  }
};
