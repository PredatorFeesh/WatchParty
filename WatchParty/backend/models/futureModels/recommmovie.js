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
    recommmovie.belongsTo(models.user,{
		as: 'recommender',
		foreignKey: 'recommenderid',
		onDelete: 'cascade'
	});
	recommmovie.belongsTo(models.user,{
		as: 'recommendee',
		foreignKey: 'recommendeeid',
		onDelete: 'cascade'
	});
	recommmovie.belongsTo(models.movie,{
		foreignKey: 'movieid',
		onDelete: 'cascade'
	});
  };
  return recommmovie;
};