'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lessons', [
      {
        title: 'This is the lesson one title',
        description: 'This is the lesson description',
        videoUrl: 'https://youtube.com/videos/a',
        published: true,
        courseId: 1,
        priority: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'This is the lesson two title',
        description: 'This is the lesson description',
        videoUrl: 'https://youtube.com/videos/a',
        published: true,
        courseId: 1,
        priority: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'This is the lesson one on course two title',
        description: 'This is the lesson description',
        videoUrl: 'https://youtube.com/videos/a',
        published: true,
        courseId: 2,
        priority: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'This is the lesson Two on course two title',
        description: 'This is the lesson description',
        videoUrl: 'https://youtube.com/videos/a',
        published: true,
        courseId: 2,
        priority: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'This is the lesson One on course three title',
        description: 'This is the lesson description',
        videoUrl: 'https://youtube.com/videos/a',
        published: true,
        courseId: 3,
        priority: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'This is the lesson Two on course three title',
        description: 'This is the lesson description',
        videoUrl: 'https://youtube.com/videos/a',
        published: true,
        courseId: 3,
        priority: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});

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
