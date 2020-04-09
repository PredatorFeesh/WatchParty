require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {Client}=require('pg');
const {Sequelize} = require('sequelize');
var config = require('./configuration/config/config.js');
console.log(config.test.username);
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const sequelize = new Sequelize(config.test.database,config.test.username,config.test.password,{
  host: config.test.host,
  port: config.test.port,
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
