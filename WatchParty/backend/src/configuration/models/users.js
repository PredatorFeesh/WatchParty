const {Sequelize} = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
	id: {
		type:DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull:false,
		validate:{notNull:true}
		},
    firstName: {
		type:DataTypes.STRING(128),
		allowNull:false,
		validate:{notNull: true}
		},
	lastName: {
		type:DataTypes.STRING(128),
		allowNull:false,
		validate:{notNull: true}
		},
    age: {
		type:DataTypes.INTEGER,
		allowNull:false,
		validate:{notNull: true,
				  max:120,
				  min:0}
		},
    email: {
		type:DataTypes.STRING(128),
		allowNull:false,
		unique:true,
		validate:{isEmail:true}
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
  users.associate = function(models) {
  };
  return users;
};