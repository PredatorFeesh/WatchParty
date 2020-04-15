const {Sequelize} = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const movieitem = sequelize.define("movieitem", {
	id: {
		type:DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull:false,
		validate:{notNull:true}
		},
    userid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
	movieid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
	beenwatched: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
	cupofteaitem:  {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		}
  },{
    freezeTableName: true
	});
  movieitem.associate = function(models) {
    movieitem.belongsTo(models.users,{
		foreignKey: 'userid'
	});
	movieitem.belongsTo(models.movie,{
		foreignKey: 'movieid'
	});
  };
  return movieitem;
};