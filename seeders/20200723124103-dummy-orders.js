'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "orders",
      [
        {
          userId: 1,
          state: 'draft',
          price: 50.3,
          notes: 'Only for admins',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          state: 'completed',
          price: 80.3,
          notes: 'Only for admins',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          state: 'draft',
          price: 50.3,
          notes: 'Only for admins',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    )

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orders", null, {});
  }
};
