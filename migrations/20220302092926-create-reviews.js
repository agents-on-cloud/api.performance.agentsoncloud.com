'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      generatedBy: {
        type: Sequelize.ENUM('manual', 'auto')
      },
      reviewerId: {
        type: Sequelize.INTEGER
      },
      reviewedId: {
        type: Sequelize.INTEGER
      },
      reviewedType: {
        type: Sequelize.ENUM('facility', 'provider', 'service', 'supplier', 'consumer')
      },
      timeUtility: {
        type: Sequelize.FLOAT
      },
      durability: {
        type: Sequelize.INTEGER
      },
      cleanliness: {
        type: Sequelize.INTEGER
      },
      servicesUtility: {
        type: Sequelize.FLOAT
      },
      responseTime: {
        type: Sequelize.FLOAT
      },
      responseQuality: {
        type: Sequelize.INTEGER
      },
      personalHygiene: {
        type: Sequelize.INTEGER
      },
      availability: {
        type: Sequelize.INTEGER
      },
      reachability: {
        type: Sequelize.INTEGER
      },
      punctuality: {
        type: Sequelize.INTEGER
      },
      sales: {
        type: Sequelize.FLOAT
      },
      profit: {
        type: Sequelize.FLOAT
      },
      returningCustomers: {
        type: Sequelize.INTEGER
      },
      bookings: {
        type: Sequelize.INTEGER
      },
      payments: {
        type: Sequelize.FLOAT
      },
      manner: {
        type: Sequelize.INTEGER
      },
      communication: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};