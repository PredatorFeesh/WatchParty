'use strict';
require('dotenv').config();

module.exports = {
  up: (queryInterface, Sequelize) => {
	let usersArray = [];
	for(let i = 0; i < 100;i++){
		usersArray.push({
			firstName:'firstname'+i,
			lastName:'lastname'+i,
			age:i+2,
			email:'testemail'+i+'@gmail.com',
			isBanned:i%2,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	};
    return queryInterface.bulkInsert("users", usersArray);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null);
  }
};
