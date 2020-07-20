'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "courses",
      [
        {
          price: 35,
          description: "This is the course description",
          videoUrl: "https://youtube.com/videos/a",
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 85,
          description: "This is the second course description",
          videoUrl: "https://youtube.com/videos/a",
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          price: 35,
          description: "This is the third course description",
          videoUrl: "https://youtube.com/videos/a",
          published: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },


      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("courses", null, {});
  },
};
