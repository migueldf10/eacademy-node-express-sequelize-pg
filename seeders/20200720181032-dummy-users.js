'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          authId: "auth0|5f1824bc35b4680013aeb429",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authId: "auth0|5f1b177478a8c0003717c939",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authId: "auth0|5f1b17a59ce55500377f871f",
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
