module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define("movie", {
	id: {
		type:DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull:false,
		validate:{notNull:true}
		},
    imdbid: {
		type:DataTypes.INTEGER,
		allowNull:false,
		unique:true,
		validate:{notNull: true}
		}},{
    freezeTableName: true
	});
  movie.associate = function(models) {
  };
  return movie;
};