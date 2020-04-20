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
		unique:'usermovie',
		validate:{notNull: true}
		},
	movieid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		unique:'usermovie',
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
    movieitem.belongsTo(models.user,{
		foreignKey: 'userid',
		onDelete: 'cascade'
	});
	movieitem.belongsTo(models.movie,{
		foreignKey: 'movieid',
		onDelete: 'cascade'
	});
  };
  return movieitem;
};