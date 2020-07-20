'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class completedLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      completedLesson.belongsTo(models.user)
      completedLesson.belongsTo(models.lesson)
      // define association here
    }
  };
  completedLesson.init({
    userId: DataTypes.INTEGER,
    lessonId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'completedLesson',
  });
  return completedLesson;
};