'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facilities-maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facilityId: {
        type: Sequelize.INTEGER
      },
      facilityName: {
        type: Sequelize.STRING
      },
      facilityType: {
        type: Sequelize.ENUM('room', 'machine')
      },
      bookingId: {
        type: Sequelize.INTEGER
      },
      bookingFrom: {
        type: Sequelize.DATE
      },
      bookingTo: {
        type: Sequelize.DATE
      },
      serviceId: {
        type: Sequelize.INTEGER
      },
      serviceName: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('facilities-maps');
  }
};