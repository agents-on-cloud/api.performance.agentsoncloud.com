'use strict';
const { faker } = require('@faker-js/faker');

const { getValidMetrics } = require('../services/metrics');
const { randomizeMetrics, calculateScores } = require('../Utils/helpers');

module.exports = {
  async up(queryInterface, Sequelize) {
    const newData = [];
    const providerNames = [];
    const facilityNames = [];
    const supplierNames = [];
    const serviceNames = [];
    const customerNames = [];

    const allReviewedNames = {
      facilities: facilityNames,
      providers: providerNames,
      services: serviceNames,
      suppliers: supplierNames,
      consumers: customerNames
    }

    // randomize reviewers names
    for (let i = 1; i < 47; i++) {
      providerNames.push({
        name: faker.name.firstName() + " " + faker.name.lastName(),
        type: 'providers.' + ['operational', 'front', 'managerial'][Math.round(Math.random() * 2)],
        id: i
      });
    }

    // randomize reviewed names
    for (let i = 1; i <= 25; i++) {
      const facility = ['room', 'equipment'][Math.round(Math.random())]
      facilityNames.push({
        name: faker.name.jobTitle() + ' ' + facility,
        type: 'facilities.' + facility,
        id: i
      });
    }

    for (let i = 1; i <= 15; i++) {
      supplierNames.push({ name: faker.commerce.productMaterial() + [' Supplier'], id: i });
    }

    for (let i = 1; i <= 17; i++) {
      serviceNames.push({ name: faker.commerce.product() + [' Services'], id: i });
    }

    for (let i = 1; i <= 400; i++) {
      customerNames.push({ name: faker.name.firstName() + " " + faker.name.lastName(), id: i });
    }

    // randomize reviews
    for (let i = 1; i <= 10000; i++) {
      const chosenType = ['facilities', 'providers', 'services', 'suppliers', 'consumers'][Math.round(Math.random() * 4)];

      // takes on the name of the reviewed randomly
      const { name: reviewedName, id: reviewedId, type: reviewedType = chosenType } = allReviewedNames[chosenType][Math.round(Math.random() * (allReviewedNames[chosenType].length - 1))]

      // fills in the metrics for all entities and providers (special, per role/providerType metric)
      const validMetrics = await getValidMetrics(reviewedType, -1);
      const reviewMetrics = randomizeMetrics(validMetrics);

      // gets the reviewerId, and reviewer name after randomizing system/user generation
      const reviewer = providerNames[Math.round(Math.random() * (providerNames.length - 1))];
      const { id: reviewerId, name: reviewerName } = reviewer;

      // calculate the end goal of score and socialScore 
      const { score, socialScore } = calculateScores(reviewMetrics, validMetrics);

      const seedData = {
        generatedBy: "manual",
        reviewerId,
        reviewerName,
        reviewedId,
        reviewedName,
        reviewedType,
        note: faker.company.catchPhrase(),
        score,
        socialScore,
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
