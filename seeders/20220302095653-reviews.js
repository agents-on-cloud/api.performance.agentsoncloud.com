'use strict';
const { faker } = require('@faker-js/faker');
const metrics = require('../../metrics.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    var newData = [];

    for (let i = 0; i < 1000; i++) {
      const reviewedType = ['facilities', 'providers', 'services', 'suppliers', 'consumers'][Math.round(Math.random() * 4)];
      const providerType = ((reviewedType === 'providers') ? ['operational', 'front-facing', 'managerial'][Math.round(Math.random() * 2)] : null);

      const reviewMetrics = {};
      if (reviewedType !== 'providers') {
        metrics[reviewedType].forEach(metric => {
          reviewMetrics[metric.name] = metric.type === 'float' ? Math.random() : Math.round(Math.random() * 4);
        })
      } else {
        metrics[reviewedType][providerType].forEach(metric => {
          reviewMetrics[metric.name] = metric.type === 'float' ? Math.random() : Math.round(Math.random() * 4);
        })
      }

      const seedData = {
        generatedBy: Math.round(Math.random()) ? 'manual' : 'auto',
        reviewerId: i,
        reviewName: faker.name.firstName() + " " + faker.name.lastName(),
        reviewedId: i,
        reviewedType,
        providerType,
        createdAt: new Date(new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime())),
        updatedAt: new Date()
      };
      newData.push({ ...seedData, ...reviewMetrics });
    }

    return queryInterface.bulkInsert('reviews', newData);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
