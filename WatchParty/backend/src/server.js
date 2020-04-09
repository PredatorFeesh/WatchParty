require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {Client}=require('pg');
const {Sequelize} = require('sequelize');
var config = require('./configuration/config/config.js');
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
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
