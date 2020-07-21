'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "courses",
      [
        {
          title: 'Course 1: the best of all',
          price: 35,
          description: "This is the course description",
          videoUrl: "https://www.youtube.com/watch?v=xbs7FT7dXYc",
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Course 2: less good',
          price: 85,
          description: "This is the second course description",
          videoUrl: "https://www.youtube.com/watch?v=4joV8bgLSDo",
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Course 3: You will learn nothing with this one',
          price: 35,
          description: "This is the third course description",
          videoUrl: "https://www.youtube.com/watch?v=rYoZgpAEkFs",
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
