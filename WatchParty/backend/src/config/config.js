require('dotenv').config(); 
module.exports = {
  development: {
    username: process.env.DB_DEVELOPMENT_USER,
    password: process.env.DB_DEVELOPMENT_PASSWORD,
    database: process.env.DB_DEVELOPMENT_DATABASE,
    host: process.env.DB_DEVELOPMENT_HOST,
	port: process.env.DB_DEVELOPMENT_PORT,
    dialect: "postgres",
    operatorsAliases: false,
  },
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST_DATABASE,
    host: process.env.DB_TEST_HOST,
	port: process.env.DB_TEST_PORT,
    dialect: "postgres",
    operatorsAliases: false,
  },
 production: {
    username: process.env.DB_PRODUCTION_USER,
    password: process.env.DB_PRODUCTION_PASSWORD,
    database: process.env.DB_PRODUCTION_DATABASE,
    host: process.env.DB_PRODUCTION_HOST,
	port: process.env.DB_PRODUCTION_PORT,
    dialect: "postgres",
    operatorsAliases: false,
  }
};
