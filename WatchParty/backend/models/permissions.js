module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define("permissions", {
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
    isBanned: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true,
				  max:1,
				  min:0}
		}
  },{
    freezeTableName: true
	});
  permissions.associate = function(models) {
    permissions.belongsTo(models.users);
  };
  return permissions;
};