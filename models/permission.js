'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      permission.belongsTo(models.user)
      permission.belongsTo(models.course)
      permission.belongsTo(models.order)
      // define association here
    }
  };
  permission.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'permission',
  });
  return permission;
};