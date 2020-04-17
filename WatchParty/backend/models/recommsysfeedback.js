module.exports = (sequelize, DataTypes) => {
  const recommsysfeedback = sequelize.define("recommsysfeedback", {
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
    userid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
	rating: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true,
				  max:10,
				  min:0}
		},
	feedback: DataTypes.STRING
  },{
    freezeTableName: true
	});
  recommsysfeedback.associate = function(models) {
    recommsysfeedback.belongsTo(models.users,{
		foreignKey: 'userid'
	});
	recommsysfeedback.belongsTo(models.movie,{
		foreignKey: 'movieid'
	});
  };
  return recommsysfeedback;
};