'use strict';
const {
  Model
} = require('sequelize');

const { REVIEWED_TYPES_ARRAY } = require('../Utils/CONSTANTS');
const { generateScores } = require('../Utils/helpers');

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
      // Manual represents the moment record by people, auto is a daily generated record by system that includes manual values of that day
      type: DataTypes.ENUM('manual', 'auto'),
      defaultValue: "manual",
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewedType: {
      type: DataTypes.ENUM(...REVIEWED_TYPES_ARRAY),
      allowNull: false,
    },

    // system generated
    timeUtility: DataTypes.FLOAT,
    servicesUtility: DataTypes.FLOAT, // get what with
    responseTime: DataTypes.FLOAT,
    returningCustomers: DataTypes.FLOAT,
    bookings: DataTypes.FLOAT,

    // cash
    payments: DataTypes.FLOAT,
    sales: DataTypes.FLOAT,
    profit: DataTypes.FLOAT,

    // behavioral
    durability: DataTypes.FLOAT,
    cleanliness: DataTypes.FLOAT,
    responseQuality: DataTypes.FLOAT,
    availability: DataTypes.FLOAT,
    reachability: DataTypes.FLOAT,
    punctuality: DataTypes.FLOAT,
    manner: DataTypes.FLOAT,
    communication: DataTypes.FLOAT,

    note: DataTypes.TEXT(),
    score: DataTypes.FLOAT,
    socialScore: DataTypes.FLOAT,
    costBenefit: DataTypes.FLOAT
  }, {
    sequelize,
    timestamps: true,
    modelName: 'reviews',
    // TODO: move score generation to cronjob for auto reviews that does 1 daily review summation for all reviewed entities that day
    // hooks: {
    // beforeCreate: (review, options) => {
    //   ({ score: review.score, socialScore: review.socialScore } = generateScores(review, options))
    // },
    // },
  });

  return reviews;
};