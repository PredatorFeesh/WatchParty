const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];
const router = require('./router');
const models = require('./models');

models.sequelize.sync();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Sessions
app.use(session({
  cookie: { maxAge: 60000 },
  secret: config.session_secret,
  store: new SequelizeStore({
    db: models.sequelize,
  }),
  // We support the touch method so per the express-session docs this
  // should be set to false
  resave: false,
  proxy: true, // if you do SSL outside of node.
  saveUninitialized: true,
}));


app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status).send(res.locals.error);
});

module.exports = app;
