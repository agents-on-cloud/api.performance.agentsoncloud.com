'use strict';
const {
  Model
} = require('sequelize');

const metrics = require('../../metrics.json');

module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reviews.init({
    generatedBy: {
      type: DataTypes.ENUM('manual', 'auto', 'survey'),
      allowNull: false,
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewedType: {
      type: DataTypes.ENUM('facilities', 'providers', 'services', 'suppliers', 'consumers'),
      allowNull: false,
    },
    providerType: DataTypes.ENUM('operational', 'front-facing', 'managerial'),
    // type specific metrics
    timeUtility: DataTypes.FLOAT,
    servicesUtility: DataTypes.FLOAT,
    responseTime: DataTypes.FLOAT,
    payments: DataTypes.FLOAT,
    sales: DataTypes.FLOAT,
    profit: DataTypes.FLOAT,
    durability: DataTypes.INTEGER,
    responseQuality: DataTypes.INTEGER,
    cleanliness: DataTypes.INTEGER,
    availability: DataTypes.INTEGER,
    reachability: DataTypes.INTEGER,
    punctuality: DataTypes.INTEGER,
    returningCustomers: DataTypes.INTEGER,
    bookings: DataTypes.INTEGER,
    manner: DataTypes.INTEGER,
    communication: DataTypes.INTEGER,
    note: DataTypes.TEXT()
  }, {
    sequelize,
    timestamps: true,
    modelName: 'reviews',
    // validate: {
    //   rating() {
    //     if (
    //       (this.reviewedType === "provider") && (this.providerType === null)) {
    //       throw new Error('Provider Type Missing');
    //     }
    //   }
    // }
  });

  return reviews;
};