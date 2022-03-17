'use strict';
const {
  Model
} = require('sequelize');

const { generateReviewScore } = require('../Utils/helpers');

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
    // TODO: add reviewer type to add consumer and supplier types (future)
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewedName: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewedType: {
      type: DataTypes.ENUM('facilities', 'providers', 'services', 'suppliers', 'consumers'),
      allowNull: false,
    },
    // TODO: Get the type from mapping as a string instead 
    providerType: DataTypes.ENUM('operational', 'front-facing', 'managerial'),
    // type specific metrics
    timeUtility: DataTypes.INTEGER,
    servicesUtility: DataTypes.INTEGER,
    responseTime: DataTypes.INTEGER,
    payments: DataTypes.INTEGER,
    sales: DataTypes.INTEGER,
    profit: DataTypes.INTEGER,
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
    score: DataTypes.INTEGER,
    note: DataTypes.TEXT()
  }, {
    sequelize,
    timestamps: true,
    modelName: 'reviews',
    hooks: {
      beforeCreate: (review) => {
        review.total = generateReviewScore(review);
      },
    },

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