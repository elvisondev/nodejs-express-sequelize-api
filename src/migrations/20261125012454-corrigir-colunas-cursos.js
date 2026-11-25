'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('cursos', 'ttulo', 'titulo');
    await queryInterface.renameColumn('cursos', 'decente_id', 'docente_id');
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('cursos', 'titulo', 'ttulo');
    await queryInterface.renameColumn('cursos', 'docente_id', 'decente_id');
  }
};
