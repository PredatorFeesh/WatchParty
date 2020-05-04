module.exports = (sequelize, DataTypes) => {
  const Sublist = sequelize.define("Sublist", {
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: 'namemovie',
      validate: { notNull: true },
    },
    movie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'namemovie',
      validate: { notNull: true },
    },
  }, {
    freezeTableName: true,
  });
  Sublist.associate = (models) => {
    Sublist.belongsTo(models.Movie, {
      foreignKey: 'movie',
      onDelete: 'cascade',
    });
  };
  Sublist.prototype.getMovies = function () { // eslint-disable-line func-names
    return Sublist.findAll({
      attribute: ['movie'],
      where: {
        name: this.name,
      },
    });
  };
  return Sublist;
};
