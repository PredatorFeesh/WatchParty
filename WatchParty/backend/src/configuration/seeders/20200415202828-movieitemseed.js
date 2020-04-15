'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
	let movieitemsArray = [];
	for(let i = 1; i < 101;i++){
		movieitemsArray.push({
			userid:i,
			movieid:i,
			beenwatched:i%2,
			cupofteaitem:0,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	};
    return queryInterface.bulkInsert("movieitem", movieitemsArray);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("movieitem", null);
  }
};
