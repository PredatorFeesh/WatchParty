const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]

module.exports = {
  up: (queryInterface, Sequelize) => {
	let friendlistArray = [];
	for(let i = 1; i < 10;i++){
		friendlistArray.push({
			requester:i,
			requestee:10,
			accepted:i%2,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	};
	for(let i = 11; i < 20;i++){
		friendlistArray.push({
			requester:10,
			requestee:i,
			accepted:i%2,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	};
    return queryInterface.bulkInsert("friendlist", friendlistArray);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("friendlist", null);
  }
};
