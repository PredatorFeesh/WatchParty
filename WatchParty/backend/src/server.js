require('dotenv').config();
const database = require('./routes/database.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {Client}=require('pg');
const {Sequelize} = require('sequelize');
var models = require('./models');
var config = require('./config/config.js');
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


const sequelize = new Sequelize(config.test.database,config.test.username,config.test.password,{
  host: config.test.host,
  port: config.test.port,
  dialect: 'postgres'
});

// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/userDetails/:userID', (req, res) => {
	database.userFindName(req.params.userID).then(function(result){
	res.send({ express: result });
});
});

app.get('/userSearch/:email', (req, res) => {
	database.emailFindName(req.params.email).then(function(result){
	res.send({ express: result });
});
});

app.get('/toWatch/:userID', (req, res) => {
	database.userToWatch(req.params.userID).then(function(result){
	res.send({ express: result });
});
});

app.get('/watched/:userID', (req, res) => {
	database.userWatched(req.params.userID).then(function(result){
	res.send({ express: result });
});
});

app.get('/following/:userID', (req, res) => {
	database.userFollowing(req.params.userID).then(function(result){
	res.send({ express: result });
});
});

app.get('/followers/:userID', (req, res) => {
	database.userFollowed(req.params.userID).then(function(result){
	res.send({ express: result });
});
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

