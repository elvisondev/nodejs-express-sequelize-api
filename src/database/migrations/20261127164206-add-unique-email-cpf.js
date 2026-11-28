'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('pessoas', {
      fields: ['email'],
      type: 'unique',
      name: 'pessoas_email_unique'
    });
    await queryInterface.addConstraint('pessoas', {
      fields: ['cpf'],
      type: 'unique',
      name: 'pessoas_cpf_unique'
    });
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('pessoas', 'pessoas_email_unique');
    await queryInterface.removeConstraint('pessoas', 'pessoas_cpf_unique');
  }
};
