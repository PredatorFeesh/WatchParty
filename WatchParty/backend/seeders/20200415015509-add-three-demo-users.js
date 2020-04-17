const bcrypt = require('bcrypt')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUserPassword = await bcrypt.hash(config.demo_user_password, config.salt_rounds)
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Tim',
        lastName: 'Null',
		age:10,
        email: 'tim@gmail.com',
        password: demoUserPassword,
		isBanned:0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Null',
		age:20,
        email: 'jane@gmail.com',
        password: demoUserPassword,
		isBanned:0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Null',
		age:30,
        email: 'john@gmail.com',
        password: demoUserPassword,
		isBanned:0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
