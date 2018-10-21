'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     queryInterface.addColumn(
      'users',
      'city',
       Sequelize.STRING
    );
     queryInterface.addColumn(
      'users',
      'state',
       Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
