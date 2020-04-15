const {Sequelize} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const recommmovie = sequelize.define("recommmovie", {
	id: {
		type:DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull:false,
		validate:{notNull:true}
		},
	movieid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
    recommenderid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
    recommendeeid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		}
  },{
    freezeTableName: true
	});
  recommmovie.associate = function(models) {
    recommmovie.belongsTo(models.users,{
		as: 'recommender',
		foreignKey: 'recommenderid'
	});
	recommmovie.belongsTo(models.users,{
		as: 'recommendee',
		foreignKey: 'recommendeeid'
	});
	recommmovie.belongsTo(models.movie,{
		foreignKey: 'movieid'
	});
  };
  return recommmovie;
};