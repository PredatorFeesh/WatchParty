require('dotenv').config();
const {Sequelize} = require('sequelize');
var models = require('../models');
var config = require('../config/config.js');

module.exports = {

	initializeDB: async function(){
		models.sequelize.sync({force:false,
			logging:console.log
		});
	},
	//Do not use unless you wish to reset database
	resetDB: async function(){
		models.sequelize.sync({force:true,
			logging:console.log
		}).then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addUser: async function(firstNameV,lastNameV,ageV,emailV,isBannedV){
		var instanceDB = models.users.build({firstName:firstNameV,
											lastName:lastNameV,
											age:ageV,
											email:emailV,
											isBanned:isBannedV,
											createdAt:new Date(),
											updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addMovie: async function(imdbidV,nameV,descriptionV){
		var instanceDB = models.movie.build({imdbid:imdbidV,
											name:nameV,
											description:descriptionV,
											createdAt:new Date(),
											updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addMovieItem: async function(useridV,movieidV,beenwatchedV,cupofteaitemV){
		var instanceDB = models.movieitem.build({userid:useridV,
												movieid:movieidV,
												beenwatched:beenwatchedV,
												cupoftime:cupofteaitemV,
												createdAt:new Date(),
												updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addSublist: async function(itemidV,nameV){
		var instanceDB = models.sublist.build({itemid:itemidV,
											name:nameV,
											createdAt:new Date(),
											updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addRequestRecommendation: async function(useridV,criteriaV){
		var instanceDB = models.requestrecommendation.build({userid:useridV,
															criteria:criteriaV,
															createdAt:new Date(),
															updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addRecommsysFeedback: async function(movieidV,useridV,ratingV){
		var instanceDB = models.recommsysfeedback.build({movieid:movieidV,	
														userid:useridV,
														rating:ratingV,
														createdAt:new Date(),
														updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addRecommMovie: async function(movieidV,recommenderidV,recommendeeidV){
		var instanceDB = models.recommmovie.build({movieid:movieidV,
												recommenderid:recommenderidV,
												recommendeeid:recommendeeidV,
												createdAt:new Date(),
												updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addPermissions: async function(useridV,isBannedV){
		var instanceDB = models.permissions.build({userid:useridV,
												isBanned:isBannedV,
												createdAt:new Date(),
												updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	addFriendlist: async function(requesterV,requesteeV,acceptedV){
		var instanceDB = models.friendlist.build({requester:requesterV,
												requestee:requesteeV,
												accepted:acceptedV,
												createdAt:new Date(),
												updatedAt:new Date()});
		instanceDB.save().then(function (value) {
			return "query success";
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	userFindName: async function(useridV){
		return models.users.findOne({where:{id:useridV},
									attributes:["firstName","lastName"],raw:true}).then(function (value) {
			return value;
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	emailFindName: async function(emailV){
		return models.users.findOne({where:{email:emailV},
									attributes:["firstName","lastName"],raw:true}).then(function (value) {
			return value;
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	userToWatch: async function(useridV){
		return models.movieitem.findAll({where:{userid:useridV,beenwatched:"0"},
									attributes:["movieid"],raw:true}).then(function (value) {
			return value;
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	userWatched: async function(useridV){
		return models.movieitem.findAll({where:{userid:useridV,beenwatched:"1"},
									attributes:["movieid"],raw:true}).then(function (value) {
			return value;
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},
	
	userFollowing: async function(useridV){
		return models.friendlist.findAll({where:{requester:useridV,accepted:"1"},
										attributes:["requestee"],raw:true}).then(function (value) {
			return value;
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	},

	userFollowed: async function(useridV){
		return models.friendlist.findAll({where:{requestee:useridV,accepted:"1"},
										attributes:["requester"],raw:true}).then(function (value) {
			return value;
		}).catch(function (err) {
			console.log(err);
			return "query fail";
		});
	}
};