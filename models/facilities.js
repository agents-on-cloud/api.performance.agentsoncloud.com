'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class facilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  facilities.init({
    facilityId: DataTypes.INTEGER,
    facilityName: DataTypes.STRING,
    facilityType: DataTypes.ENUM('room', 'machine'),
    bookingId: DataTypes.INTEGER,
    bookingFrom: DataTypes.DATE,
    bookingTo: DataTypes.DATE,
    serviceId: DataTypes.INTEGER,
    serviceName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'facilities',
  });
  return facilities;
};