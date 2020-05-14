module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    firstname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { notNull: true },
    },
    lastname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { notNull: true },
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: { notNull: true, len: [8, 256] },
    },
  }, {
    freezeTableName: true,
  });
  // Associations
  User.associate = (models) => {
    User.belongsToMany(models.User, {
      foreignKey: 'followeeId',
      as: 'followers',
      through: 'UserFollower',
    });
    User.belongsToMany(models.User, {
      foreignKey: 'followerId',
      as: 'following',
      through: 'UserFollower',
    });
  };
  // Custom methods
  User.prototype.getMoviesByWatchState = function (watchstate) {
    const Movie = sequelize.import('movie');
	return Movie.findAll({ attributes: ['id','tmdbid'], where: { userid: this.id, watchstate: watchstate } });
  };
  User.getMoviesByWatchState = function (watchstate,userid) {
    const Movie = sequelize.import('movie');
	return Movie.findAll({ attributes: ['id','tmdbid'], where: { userid: userid, watchstate: watchstate } });
  };
  User.prototype.getOverlappedMoviesWith = function (watchstate,userid) {
    const Movie = sequelize.import('movie');
	const Moviearray = Movie.findAll({
	  attributes: ['tmdbid'],
	  where: {
		userid: userid,
		watchstate: watchstate,
	  },
	  raw: true,
	});
	return Movie.findAll({
	  attributes: ['tmdbid'],
	  where: {
		userid: this.id,
		watchstate: watchstate,
		tmdbid: Moviearray,
	  }
	});
  };
  User.prototype.addMovie = function (tmdbid,watchstate) {
    const Movie = sequelize.import('movie');
	return Movie.create({
	  userid: this.id,
	  tmdbid: tmdbid,
	  watchstate: watchstate,
	});
  };
  User.prototype.deleteMovie = function (movieid) {
    const Movie = sequelize.import('movie');
	return Movie.destroy({
      where: {
        userid: this.id,
        tmdbid: movieid,
	  }
	});
  };
  User.prototype.changeMovieWatchState = function (movieid,state) {
    const Movie = sequelize.import('movie');
	Movie.update({watchstate:state},{where: {userid: this.id,tmdbid: movieid}});
  };
  User.prototype.addMovieToSublist = function (name,movieid) {
    const Sublist = sequelize.import('sublist');
	return Sublist.create({
	  name:name,
	  userID: this.id,
	  movieID: movieid,
	});
  };
  User.prototype.deleteSublist = function (name) {
    const Sublist = sequelize.import('sublist');
	return Sublist.destroy({
      where: {
		name: name,
		userID: this.id,
	}
	});
  };
  User.searchForUserWithEmail = function (email) {
	return User.findOne({
	  where: {
	    email: email,
	  }
	  ,raw:true,
	});
  };
  User.searchForUserWithID = function (id) {
	return User.findOne({
	  where: {
	    id: id,
	  },
	  raw:true,
	});
  };
  return User;
};
