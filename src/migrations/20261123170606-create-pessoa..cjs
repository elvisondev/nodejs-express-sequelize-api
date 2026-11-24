'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // * Sempre mudar o nome da createTable('pessoas') colocando no plural e com a 1 letra minuscula
    await queryInterface.createTable('pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      ativo: {
        type: Sequelize.BOOLEAN
      },
      role: {
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
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    // * Comando pra derrubar a tabela
    await queryInterface.dropTable('pessoas');
  }
};