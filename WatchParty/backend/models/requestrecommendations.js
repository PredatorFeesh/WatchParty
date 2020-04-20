module.exports = (sequelize, DataTypes) => {
  const requestrecomendations = sequelize.define("requestrecommendations", {
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
	criteria: {
		type:DataTypes.TEXT,
		allowNull:false,
		validate:{notNull: true}
		}
  },{
    freezeTableName: true
	});
  requestrecomendations.associate = function(models) {
    requestrecomendations.belongsTo(models.user,{
		foreignKey: 'userid',
		onDelete: 'cascade'
	});
  };
  return requestrecomendations;
};