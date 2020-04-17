require('dotenv').config();
const express = require('express');
const router = express.Router();
const { UniqueConstraintError, ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
const models = require('./models')

// GET /api/userDetails
router.get('/userDetails/:userID', function(req, res, next) {
  models['users']
    .findOne({
      attributes: ['firstName', 'lastName'],
      where: { id: req.params.userID }
    })
    .then(user => {
		if (user==null){
			res.send(`Unable to get user ${req.params.userID}`)
		}
		else{
			res.json(user)}
		})
    .catch(err => {
      console.log(err)
      return res.status(500).send(`Unable to get user ${req.params.userID}`)
    })
});

// GET /api/userSearch
router.get('/userSearch/:email', function(req, res, next) {
  models['users']
    .findOne({
      attributes: ['firstName', 'lastName'],
      where: { email: req.params.email }
    })
    .then(user => {
		if (user==null){
			res.send(`Unable to get user with email: ${req.params.email}`)
		}
		else{
			res.json(user)}
		})
    .catch(err => {
      console.log(err)
      return res.status(500).send(`Unable to get user with email: ${req.params.email}`)
    })
});

// GET /api/toWatch
router.get('/toWatch/:userID', function(req, res, next) {
  models['movieitem']
    .findAll({
      attributes: ['movieid'],
      where: { userid:req.params.userID, beenwatched:'0'}
    })
    .then(movieitem => {
		if (movieitem.length==0){
			res.send(`Unable to get user's movies to watch with id: ${req.params.userID}`)
		}
		else{
			res.json(movieitem)}
		})
    .catch(err => {
      console.log(err)
      return res.status(500).send(`Unable to get user's movies to watch with id: ${req.params.userID}`)
    })
});

// GET /api/watched
router.get('/watched/:userID', function(req, res, next) {
  models['movieitem']
    .findAll({
      attributes: ['movieid'],
      where: { userid:req.params.userID, beenwatched:'1'}
    })
    .then(movieitem => {
		if (movieitem.length==0){
			res.send(`Unable to get user's movies watched with id: ${req.params.userID}`)
		}
		else{
			res.json(movieitem)}
		})
    .catch(err => {
      console.log(err)
      return res.status(500).send(`Unable to get user's movies watched with id: ${req.params.userID}`)
    })
});

// GET /api/following
router.get('/following/:userID', function(req, res, next) {
  models['friendlist']
    .findAll({
      attributes: ['requestee'],
      where: { requester: req.params.userID, accepted:"1" }
    })
    .then(friendlist =>  {
		if (friendlist.length==0){
			res.send(`Unable to get following with id: ${req.params.userID}`)
		}
		else{
			res.json(friendlist)}
		})
    .catch(err => {
      console.log(err)
      return res.status(500).send(`Unable to get following with id: ${req.params.userID}`)
    })
});

// GET /api/followers
router.get('/followers/:userID', function(req, res, next) {
  models['friendlist']
    .findAll({
      attributes: ['requester'],
      where: { requestee: req.params.userID, accepted:"1" }
    })
    .then(friendlist => {
		if (friendlist.length==0){
			res.send(`Unable to get followers with id: ${req.params.userID}`)
		}
		else{
			res.json(friendlist)}
		})
    .catch(err => {
      console.log(err)
      return res.status(500).send(`Unable to get followers with id: ${req.params.userID}`)
    })
});

// POST /api/createUser
router.post('/createUser', function(req, res, next) {
  // Collect parameters
  const params = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }

  // Create record
  models['users']
    .create(params)
    .then(async user => {
      // Update password with hash
      user.password = await bcrypt.hash(user.password, config.salt_rounds)
      user.save()
      res.json({ message: `Created user with email: ${user.email}`})
    }).catch(err => {
      if (err instanceof UniqueConstraintError) {
        console.log(err)
        return res.status(412).send('An account already exists with that email')
      }
      else if (err instanceof ValidationError) {
        console.log(err)
        return res.status(412).send(err.message)
      }
      else {
        console.log(err)
        return res.status(500).send('Unable to create user')
      }
    })
});

// POST /api/login
router.post('/login', (req, res, next) => {
  // Check if already logged in
  if (req.session.user !== undefined) {
    return res.json({ message: `Already logged in as ${req.session.user.email}` })
  }

  // Collect parameters
  const params = {
    email: req.body.email,
    password: req.body.password
  }

  // Validate parameters
  const validationCheck = Object.values(params).every(val => val !== undefined)
  if (!validationCheck) {
    return res.status(412).send('Missing parameters')
  }

  models['users']
    .findOne({
      attributes: ['email', 'password'],
      where: { email: params.email }
    })
    .then(async user => {
      const match = await bcrypt.compare(params.password, user.password)
      if (match) {
        req.session.user = user
        return res.json({ message: `Successfully logged in as ${user.email}` })
      }
      else {
        throw new Error('Incorrect login credentials')
      }
    }).catch(err => {
      if (err.message === 'Incorrect login credentials') {
        console.log(err)
        return res.status(403).send(err.message)
      }
      else {
        console.log(err)
        return res.status(500).send('Incorrect login credentials')
      }
    })
})

// POST /api/logout
router.post('/logout', (req, res, next) => {
  // Check if already logged in
  if (req.session.user !== undefined) {
    req.session.destroy(err => {
      if (err) {
        console.log(err)
        return res.status(500).send('Unable to logout')
      }
      return res.json({ message: 'You have successfully logged out' })
    })
  }
  else {
    return res.status(401).send('Already logged out')
  }
})

module.exports = router;
