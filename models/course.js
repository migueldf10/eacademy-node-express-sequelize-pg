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
      // define association here
    }
  };
  course.init({
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    videUrl: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};