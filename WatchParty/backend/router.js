const express = require('express');

const router = express.Router();
const { UniqueConstraintError, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
const models = require('./models');

// GET /api/userDetails
router.get('/userDetails/:userID', (req, res) => {
  models.User
    .findOne({
      attributes: ['firstname', 'lastname'],
      where: { id: req.params.userID },
    })
    .then((user) => {
      if (!user) throw Error();
      return res.status(200).json({ message: 'Success', user });
    })
    .catch(() => res.status(404).send({
      message: `Unable to get user ${req.params.userID}`,
    }));
});

// POST /api/createUser
router.post('/createUser', (req, res) => {
  // Collect parameters
  const params = {
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  // Create record
  models.User
    .create(params)
    .then(async (user) => {
      // Update password with hash
      /* eslint-disable no-param-reassign */
      user.password = await bcrypt.hash(user.password, config.salt_rounds);
      /* eslint-enable no-param-reassign */
      user.save();
      res.status(200).json({ message: 'Success', details: `Created user with email: ${user.email}` });
    }).catch((err) => {
      if (err instanceof UniqueConstraintError) {
        return res.status(412).send({ message: 'An account already exists with that email' });
      } if (err instanceof ValidationError) {
        return res.status(412).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Unable to create user' });
    });
});

// POST /api/login
router.post('/login', (req, res) => {
  // Check if already logged in
  if (req.session.user !== undefined) {
    return res.status(200).json({ message: `Already logged in as ${req.session.user.email}` });
  }

  // Collect parameters
  const params = {
    email: req.body.email,
    password: req.body.password,
  };

  // Validate parameters
  const validationCheck = Object.values(params).every((val) => val !== undefined);
  if (!validationCheck) {
    return res.status(412).send({ message: 'Missing parameters' });
  }

  models.User
    .findOne({
      attributes: ['email', 'password'],
      where: { email: params.email },
    })
    .then(async (user) => {
      const match = await bcrypt.compare(params.password, user.password);
      if (match) {
        req.session.user = user;
        return res.status(200).json({ message: 'Success', details: `Logged in as ${user.email}` });
      }

      throw new Error('Incorrect login credentials');
    }).catch((err) => {
      if (err.message === 'Incorrect login credentials') {
        return res.status(403).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Incorrect login credentials' });
    });

  // If an success or error isn't already triggered then return an error
  return res.status(500).send({ message: 'Unable to login' });
});

// POST /api/logout
router.post('/logout', (req, res) => {
  // Check if already logged in
  if (req.session.user !== undefined) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: 'Unable to logout' });
      }
      return res.status(200).json({ message: 'Sucess', details: 'You are now logged out' });
    });
  } else {
    return res.status(401).send({ message: 'Already logged out' });
  }

  // If an success or error isn't already triggered then return an error
  return res.status(500).send({ message: 'Unable to logout' });
});

// GET /api/to-watch
router.get('/to-watch/:userID', function(req, res, next) {
  models.User.getMoviesByWatchState('to-watch',req.params.userID)
  .then(data=>res.json(data))
  .catch(err=>{
		console.log(err);
		res.sendStatus(500);
	})
})

// GET /api/watched
router.get('/watched/:userID', function(req, res, next) {
  models.User.getMoviesByWatchState('watched',req.params.userID)
  .then(data=>res.json(data))
  .catch(err=>{
		console.log(err);
		res.sendStatus(500);
	})
})

// GET /api/not-interested
router.get('/not-interested/:userID', function(req, res, next) {
  models.User.getMoviesByWatchState('not-interested',req.params.userID)
  .then(data=>res.json(data))
  .catch(err=>{
		console.log(err);
		res.sendStatus(500);
	})
})

// POST /api/addMovie
router.post('/addMovie', function(req, res, next) {
	// Collect parameters
	const params = { 
		userid: req.body.userid,
		tmdbid: req.body.tmdbid,
		watchstate: req.body.watchstate,
	}
	models.User.findOne({where: { id: params.userid }})
    .then(data=> data.addMovie( params.tmdbid, params.watchstate))    
	.catch(err=>{
		console.log(err);
		res.sendStatus(500);
	})
})

// POST /api/deleteMovie
router.post('/deleteMovie', function(req, res, next) {
	// Collect parameters
	const params = { 
		userid: req.body.userid,
		tmdbid: req.body.tmdbid,
	}
	models.Movie.destroy({where: { userid: params.userid, tmdbid: params.tmdbid }})
    .then(data=>res.json(data))
    .catch(err=>{
		console.log(err);
		res.sendStatus(500);
	})
})

// POST /api/changeMovieWatchState
router.post('/changeMovieWatchState', function(req, res, next) {
	// Collect parameters
	const params = { 
		userid: req.body.userid,
		tmdbid: req.body.tmdbid,
		watchstate: req.body.watchstate,
	}
	models.User.findOne({where: { id: params.userid }})
    .then(data=> data.addMovie( params.tmdbid, params.watchstate))    
	.catch(err=>{
		console.log(err);
		res.sendStatus(500);
	})
})

module.exports = router;
