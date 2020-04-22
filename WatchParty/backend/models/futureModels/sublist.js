module.exports = (sequelize, DataTypes) => {
  const sublist = sequelize.define("sublist", {
	id: {
		type:DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull:false,
		validate:{notNull:true}
		},
    itemid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
	name: {
		type:DataTypes.STRING(128),
		allowNull:false,
		validate:{notNull: true}
		}
  },{
    freezeTableName: true
	});
  sublist.associate = function(models) {
	sublist.belongsTo(models.movie,{
		foreignKey: 'itemid',
		onDelete: 'cascade'
	});
  };
  return sublist;
};