'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // * Sempre mudar o nome da createTable('pessoas') colocando no plural e com a 1 letra minuscula
    await queryInterface.addColumn('categorias', 'deletedAt',  {
      allowNull: true,
      type: Sequelize.DATE
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    // * Comando pra derrubar a tabela
    await queryInterface.removeColumn('categorias', 'deletedAt');
  }
};