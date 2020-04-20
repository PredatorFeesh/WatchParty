const bcrypt = require('bcrypt')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]

module.exports = {
  up: async(queryInterface, Sequelize) => {
    const demoUserPassword = await bcrypt.hash(config.demo_user_password, config.salt_rounds)
	let usersArray = [];
	for(let i = 0; i < 100;i++){
		usersArray.push({
			firstName:'firstname'+i,
			lastName:'lastname'+i,
			age:i+2,
			email:'testemail'+i+'@gmail.com',
			password: demoUserPassword,
			isBanned:i%2,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	};
    return queryInterface.bulkInsert("user", usersArray);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null);
  }
};
