module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define("Follow", {
    followee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: true }
    },
    follower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: true }
    }
},{
    freezeTableName: true
	});
	Follow.associate = function(models) {
	    Follow.belongsTo(models.User,{
		foreignKey: 'followee',
		onDelete: 'cascade'
	});
	Follow.belongsTo(models.User,{
		foreignKey: 'follower',
		onDelete: 'cascade'
	});}
  return Follow;
}