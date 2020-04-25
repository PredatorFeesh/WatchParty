module.exports = (sequelize, DataTypes) => {
  const Sublist = sequelize.define("Sublist", {
    name: {
		type: DataTypes.STRING(32),
		allowNull: false,
		unique: 'uniquecombination',
		validate: { notNull: true }
    },
    movie: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: { notNull: true }
    }
},{
    freezeTableName: true
	});
	Sublist.associate = function(models) {
	Sublist.belongsTo(models.Movie,{
		foreignKey: 'movie',
		onDelete: 'cascade'
	});}
  return Sublist;
}