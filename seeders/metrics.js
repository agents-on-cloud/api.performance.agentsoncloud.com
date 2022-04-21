'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const orgId = "-1";
    try {
      await queryInterface.bulkInsert('metrics', [{ orgId }]);
    } catch (error) {
    }

    let [schema] = await queryInterface.sequelize.query("select * from metrics WHERE orgId = -1", { type: queryInterface.sequelize.QueryTypes.SELECT });
    schema = JSON.parse(JSON.stringify(schema));
    return
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('metrics', null, {});
  }
};
