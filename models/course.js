'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      course.hasMany(models.lesson);
      course.belongsToMany(models.user, {
        through: "orders",
        foreignKey: "courseId",
      });
      // define association here
    }
  };
  course.init({
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};