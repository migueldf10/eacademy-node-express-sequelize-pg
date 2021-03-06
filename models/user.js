'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.course, {
        through: "permissions",
        foreignKey: "userId",
      });
      user.hasMany(models.completedLesson)
      user.hasMany(models.todoLesson)
      user.hasMany(models.order)
      user.hasMany(models.permission)
    }
  };
  user.init({
    authId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
}; 