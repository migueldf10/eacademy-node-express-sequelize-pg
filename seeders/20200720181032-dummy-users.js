'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "miguel",
          password: "miguel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "john",
          password: "john",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "toen",
          password: "toen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
