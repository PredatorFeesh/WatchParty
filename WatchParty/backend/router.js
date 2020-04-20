require('dotenv').config();
const express = require('express');
const router = express.Router();
const { UniqueConstraintError, ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const env = process.env.NODE_ENV || 'development'
const config = require('./config/config.js')[env]
const models = require('./models')

// GET /api/userDetails
router.get('/userDetails/:userID', function(req, res, next) {
  models['user']
    .findOne({
		attributes: ['firstName', 'lastName'],
		where: {id: req.params.userID }
    })
    .then(user => {
		if (user==null){
			res.status(204).send(`Unable to get user ${req.params.userID}`)
		}
		else{
			res.json(user)}
		})
    .catch(err => {
		console.log(err)
		return res.status(500).send(`Unable to get user ${req.params.userID}`)
    })
})

// GET /api/userSearch
router.get('/userSearch/:email', function(req, res, next) {
  models['user']
    .findOne({
		attributes: ['firstName', 'lastName'],
		where: { email: req.params.email }
    })
    .then(user => {
		if (user==null){
			res.status(204).send(`Unable to get user with email: ${req.params.email}`)
		}
		else{
			res.json(user)}
		})
    .catch(err => {
		console.log(err)
		return res.status(500).send(`Unable to get user with email: ${req.params.email}`)
    })
})

// GET /api/toWatch
router.get('/toWatch/:userID', function(req, res, next) {
  models['movieitem']
    .findAll({
		attributes: ['movieid'],
		where: { userid:req.params.userID, beenwatched:'0'}
    })
    .then(movieitem => {
		if (movieitem.length==0){
			res.status(204).send(`Unable to get user's movies to watch with id: ${req.params.userID}`)
		}
		else{
			res.json(movieitem)}
		})
    .catch(err => {
		console.log(err)
		return res.status(500).send(`Unable to get user's movies to watch with id: ${req.params.userID}`)
    })
})

// GET /api/watched
router.get('/watched/:userID', function(req, res, next) {
  models['movieitem']
    .findAll({
		attributes: ['movieid'],
		where: { userid:req.params.userID, beenwatched:'1'}
    })
    .then(movieitem => {
		if (movieitem.length==0){
			res.status(204).send(`Unable to get user's movies watched with id: ${req.params.userID}`)
		}
		else{
			res.json(movieitem)}
		})
    .catch(err => {
		console.log(err)
		return res.status(500).send(`Unable to get user's movies watched with id: ${req.params.userID}`)
    })
})

// GET /api/following
router.get('/following/:userID', function(req, res, next) {
  models['friendlist']
    .findAll({
		attributes: ['requestee'],
		where: { requester: req.params.userID, accepted:"1" }
    })
    .then(friendlist =>  {
		if (friendlist.length==0){
			res.status(204).send(`Unable to get following with id: ${req.params.userID}`)
		}
		else{
			res.json(friendlist)}
		})
    .catch(err => {
		console.log(err)
		return res.status(500).send(`Unable to get following with id: ${req.params.userID}`)
    })
})

// GET /api/followers
router.get('/followers/:userID', function(req, res, next) {
  models['friendlist']
    .findAll({
		attributes: ['requester'],
		where: { requestee: req.params.userID, accepted:"1" }
    })
    .then(friendlist => {
		if (friendlist.length==0){
			res.status(204).send(`Unable to get followers with id: ${req.params.userID}`)
		}
		else{
			res.json(friendlist)}
		})
    .catch(err => {
		console.log(err)
		return res.status(500).send(`Unable to get followers with id: ${req.params.userID}`)
    })
})

// POST /api/createUser
router.post('/createUser',  [
	//Checks if email is valid
	check('email').isEmail(),
	//Checks if password is valid
	check('password').isLength({ min: 8 }).withMessage('must be at least 8 characters long'),
	//Checks if first name is valid
	check('firstName').isLength({min:1,max:32}).withMessage('must be between 1 to 32 characters long')
	.matches(/^[a-zA-Z]+$/).withMessage('must contain only letters'),
	//Checks if last name is valid
	check('lastName').isLength({min:1,max:32}).withMessage('must be between 1 to 32 characters long')
	.matches(/^[a-zA-Z]+$/).withMessage('must contain only letters'),
	//Checks if age is valid
    check('age').isInt({gt:10,lt:100}).withMessage('must be an integer between 10 and 100')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		email: req.body.email,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		age: req.body.age,
		isBanned:0
	}
	// Create record
	models['user']
    .create(params)
    .then(async user => {
		// Update password with hash
		user.password = await bcrypt.hash(user.password, config.salt_rounds)
		user.save()
		res.json({ message: `Created user with email: ${req.body.email}`})
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
})

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

	models['user']
    .findOne({
		attributes: ['email', 'password'],
		where: {email: params.email }
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

// POST /api/addToWatch
router.post('/addToWatch',[//Checks if user ID is valid
	check('userid').isInt().withMessage('User ID must be an integer'),
	//Checks if movie ID is valid
	check('movieid').isInt().withMessage('Movie ID must be an integer')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		userid: req.body.userid,
		movieid: req.body.movieid,
		beenwatched: 0,
		cupofteaitem: 0
	}
	// Create record
	models['movieitem']
    .create(params)
    .then(async movieitem => {
		movieitem.save()
		res.json({ message: `Created to watch movieitem with userID: ${req.body.userid} and movieID:${req.body.movieid}`})
    }).catch(err => {
		if (err instanceof UniqueConstraintError) {
			console.log(err)
			return res.status(412).send('This user already has this movie added')
		}
		else if (err instanceof ValidationError) {
			console.log(err)
			return res.status(412).send(err.message)
		}
		else {
			console.log(err)
			return res.status(500).send('Unable to create movieitem')
		}
    })
})

// POST /api/addToWatch
router.post('/addWatched',[//Checks if user ID is valid
	check('userid').isInt().withMessage('User ID must be an integer'),
	//Checks if movie ID is valid
	check('movieid').isInt().withMessage('Movie ID must be an integer')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		userid: req.body.userid,
		movieid: req.body.movieid,
		beenwatched: 1,
		cupofteaitem: 0
	}
	// Create record
	models['movieitem']
    .create(params)
    .then(async movieitem => {
		movieitem.save()
		res.json({ message: `Created to watch movieitem with userID: ${req.body.userid} and movieID:${req.body.movieid}`})
    }).catch(err => {
		if (err instanceof UniqueConstraintError) {
			console.log(err)
			return res.status(412).send('This user already has this movie added')
		}
		else if (err instanceof ValidationError) {
			console.log(err)
			return res.status(412).send(err.message)
		}
		else {
			console.log(err)
			return res.status(500).send('Unable to create movieitem')
		}
    })
})

// POST /api/followUser
router.post('/followUser',[//Checks if requester ID is valid
	check('requesterid').isInt().withMessage('Requester ID must be an integer'),
	//Checks if requestee ID is valid
	check('requesteeid').isInt().withMessage('Requestee ID must be an integer')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		requester: req.body.requesterid,
		requestee: req.body.requesteeid,
		accepted:0
	}
	// Create record
	models['friendlist']
    .create(params)
    .then(async friendlist => {
		friendlist.save()
		res.json({ message: `Created a friend request with requester: ${req.body.requesterid} and requestee:${req.body.requesteeid}`})
    }).catch(err => {
		if (err instanceof UniqueConstraintError) {
			console.log(err)
			return res.status(412).send('This user already has sent this request')
		}
		else if (err instanceof ValidationError) {
			console.log(err)
			return res.status(412).send(err.message)
		}
		else {
			console.log(err)
			return res.status(500).send('Unable to create friendlist')
      }
    })
})

// POST /api/deleteUser
router.post('/deleteUser',[//Checks if user ID is valid
	check('userid').isInt().withMessage('User ID must be an integer')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		userid: req.body.userid
	}
	// Delete record
	models['user']
    .destroy({where:{id:params.userid}})
	.then(async result =>{
		res.json({message:'You have deleted'+result+' user results'})})
	.catch(err => {
        console.log(err)
        return res.status(500).send('Unable to delete user')
    })
})

// POST /api/deleteToWatchItem
router.post('/deleteToWatchItem',[//Checks if user ID is valid
	check('userid').isInt().withMessage('User ID must be an integer'),
	check('movieid').isInt().withMessage('Movie ID must be an integer')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		userid: req.body.userid,
		movieid:req.body.movieid
	}
	// Delete record
	models['movieitem']
    .destroy({where:{userid:params.userid,
					movieid:params.movieid,
					beenwatched:0}})
	.then(async result =>{
		res.json({message:'You have deleted'+result+' to Watch results'})})
	.catch(err => {
        console.log(err)
        return res.status(500).send('Unable to delete unwatched item')
    })
})

// POST /api/deleteWatchedItem
router.post('/deleteWatchedItem',[//Checks if user ID is valid
	check('userid').isInt().withMessage('User ID must be an integer'),
	check('movieid').isInt().withMessage('Movie ID must be an integer')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		userid: req.body.userid,
		movieid:req.body.movieid
	}
	// Delete record
	models['movieitem']
    .destroy({where:{userid:params.userid,
					movieid:params.movieid,
					beenwatched:1}})
	.then(async result =>{
		res.json({message:'You have deleted'+result+' follow watched results'})})
	.catch(err => {
        console.log(err)
        return res.status(500).send('Unable to delete watched item')
    })
})

// POST /api/unfollow
router.post('/unfollow',[//Checks if requester ID is valid
	check('requesterid').isInt().withMessage('requester ID must be an integer'),
	//Checks if requestee ID is valid
	check('requesteeid').isInt().withMessage('requestee ID must be an integer')], 
	function(req, res, next) {
	// Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// Collect parameters
	const params = {
		requester: req.body.requesterid,
		requestee:req.body.requesteeid
	}
	// Delete record
	models['friendlist']
    .destroy({where:{requester:params.requester,
					requestee:params.requestee
					}})
	.then(async result =>{
		res.json({message:'You have deleted'+result+' follow results'})})
	.catch(err => {
        console.log(err)
        return res.status(500).send('Unable to unfollow')
    })
})

module.exports = router;