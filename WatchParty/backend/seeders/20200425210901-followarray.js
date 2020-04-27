module.exports = {

  up: (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
	let FollowArray = [];
	for(let i = 1; i < 10;i++){
		FollowArray.push({
			follower:i,
			followee:20,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	}
	for(let i = 1; i < 10;i++){
		FollowArray.push({
			follower:20,
			followee:i,
			createdAt:new Date(),
			updatedAt:new Date()
		})
	}
    return queryInterface.bulkInsert("Follow", FollowArray);
  },

  down: (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
    return queryInterface.bulkDelete("Follow", null);
  }
};
