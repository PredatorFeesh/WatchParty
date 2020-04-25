module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { notNull: true }
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { notNull: true }
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: { notNull: true, len: [8, 256] }
    }
  }, {
	  freezeTableName: true
  })
  User.associate = function(models) {
  }
  return User
}
