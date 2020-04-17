module.exports = (sequelize, DataTypes) => {
  const friendlist = sequelize.define("friendlist", {
	id: {
		type:DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull:false,
		validate:{notNull:true}
		},
    requester: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
	requestee: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true}
		},
	accepted: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true,
				  max:1,
				  min:0}
		}
  },{
    freezeTableName: true
	});
  friendlist.associate = function(models) {
    friendlist.belongsTo(models.users,{
		as: 'request',
		foreignKey: 'requester'
	});
	friendlist.belongsTo(models.users,{
		as: 'receive',
		foreignKey: 'requestee'
	});
  };
  return friendlist;
};