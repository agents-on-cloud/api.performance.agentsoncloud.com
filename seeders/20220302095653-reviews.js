'use strict';
const { faker } = require('@faker-js/faker');
const metrics = require('../../metrics.json');

module.exports = {
  async up(queryInterface, Sequelize) {
    const newData = [];
    const reviewerNames = [];
    const facilityNames = [];
    const supplierNames = [];
    const serviceNames = [];
    const customerNames = [];

    const allReviewedNames = {
      facilities: facilityNames,
      providers: reviewerNames,
      services: serviceNames,
      suppliers: supplierNames,
      consumers: customerNames
    }

    // randomize reviewers names
    for (let i = 1; i < 47; i++) {
      reviewerNames.push({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        type: ['operational', 'front-facing', 'managerial'][Math.round(Math.random() * 2)],
        id: i
      });
    }

    // randomize reviewed names
    for (let i = 0; i < 25; i++) {
      facilityNames.push({ name: faker.name.jobTitle() + [' room', ' machine'][Math.round(Math.random())], id: i });
    }

    for (let i = 0; i < 15; i++) {
      supplierNames.push({ name: faker.commerce.productMaterial() + [' Supplier'], id: i });
    }

    for (let i = 0; i < 17; i++) {
      serviceNames.push({ name: faker.commerce.product() + [' Services'], id: i });
    }

    for (let i = 0; i < 400; i++) {
      customerNames.push({ name: faker.name.firstName() + " " + faker.name.lastName(), id: i });
    }

    // randomize reviews
    for (let i = 0; i < 10000; i++) {
      const reviewedType = ['facilities', 'providers', 'services', 'suppliers', 'consumers'][Math.round(Math.random() * 4)];

      // takes on the name of the reveiwed randomly
      const { name: reviewedName, id: reviewedId, type: providerType = null } = allReviewedNames[reviewedType][Math.round(Math.random() * (allReviewedNames[reviewedType].length - 1))]

      // fills in the metrics for all entities and providers (special, per role/providerType metric)
      const reviewMetrics = {};
      const metricsArray = reviewedType !== 'providers' ? metrics[reviewedType] : metrics[reviewedType][providerType];

      let value = 0;
      let count = 0;
      let total = 0;
      metricsArray.forEach(metric => {
        value = Math.round(Math.random() * metric.base);
        reviewMetrics[metric.name] = value;
        if (metric.base === 100 && value != 0) {
          count++;
          total += value;
        }
      });
      let score = parseInt(total / count) || 0;

      // gets the reviewerId, and reviewer name after randomizing system/user generation
      const generatedBy = Math.round(Math.random()) ? 'manual' : 'auto';
      const reviewer = reviewerNames[Math.round(Math.random() * (reviewerNames.length - 1))];
      const { id: reviewerId, name: reviewerName } =
        generatedBy === 'manual' ? reviewer : { name: "System", id: 0 };

      const seedData = {
        generatedBy,
        reviewerId,
        reviewerName,
        reviewedId,
        reviewedName,
        reviewedType,
        providerType,
        score,
        note: faker.company.catchPhrase(),
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
