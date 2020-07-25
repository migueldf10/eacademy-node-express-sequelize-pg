'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("permissions", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("permissions", "courseId", {
      type: Sequelize.INTEGER,
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("lessons", "courseId", {
      type: Sequelize.INTEGER,
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("completedLessons", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("completedLessons", "lessonId", {
      type: Sequelize.INTEGER,
      references: {
        model: "lessons",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("todoLessons", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("todoLessons", "lessonId", {
      type: Sequelize.INTEGER,
      references: {
        model: "lessons",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("permissions", "userId");
    await queryInterface.removeColumn("permissions", "courseId");
    await queryInterface.removeColumn("lessons", "courseId");
    await queryInterface.removeColumn("completedLessons", "userId");
    await queryInterface.removeColumn("completedLessons", "lessonId");
    await queryInterface.removeColumn("todoLessons", "userId");
    await queryInterface.removeColumn("todoLessons", "lessonId");
  },
};
