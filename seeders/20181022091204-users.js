'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Users = require('../.data/users.json').users
    let usersArray = []
    Users.forEach((user) => {
      usersArray.push({
        id: user['id'],
        firstname: user['firstname'],
        lastname: user['lastname'],
        address: user['address'],
        phone: user['phone'],
        website: user['website'],
        service_areas: user['service_areas'],
        business_name: user['business_name'],
        zipcode: user['zipcode'],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('users', cardssArray)
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null)
  }
}
