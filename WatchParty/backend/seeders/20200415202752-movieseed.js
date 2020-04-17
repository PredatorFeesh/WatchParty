const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.js')[env]
module.exports = {
  up: (queryInterface, Sequelize) => {
	let moviesArray = [];
	for(let i = 0; i < 100;i++){
		moviesArray.push({
			imdbid:i*1000,
			name:'samplename'+i,
			description:'sample description'+i,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	};
    return queryInterface.bulkInsert("movie", moviesArray);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("movie", null);
  }
};
