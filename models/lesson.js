'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      lesson.belongsTo(models.course);
      lesson.hasMany(models.completedLesson)
      lesson.hasMany(models.todoLesson)
    }
  };
  lesson.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    courseId: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    videUrl: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'lesson',
  });
  return lesson;
};