module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    firstname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { notNull: true }
    },
    lastname: {
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
  return User
}
