module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'uniqueusermovie',
      validate: { notNull: true },
    },
    tmdbid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'uniqueusermovie',
      validate: { notNull: true },
    },
    watchstate: {
      type: DataTypes.ENUM,
      values: ['watched', 'to-watch', 'not-interested'],
      allowNull: false,
      validate: { notNull: true },
    },
  }, {
    freezeTableName: true,
  });
  Movie.associate = function (models) {
    Movie.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'cascade',
    });
  };
  return Movie;
};
