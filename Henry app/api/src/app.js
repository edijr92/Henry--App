const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const {Usuario, conn} = require('./db.js');

const crypto = require("crypto");
const server = express();
server.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
  methods: "GET, POST, OPTIONS, PUT, DELETE",
}));
server.name = 'API';
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async function(email, password, done) {
    try {
      const user = await Usuario.findOne({ where: { email: email, active: true } })
      console.log({user})
      if (!user) {
        return done(null, false, { message: 'Incorrect username.', input : "email" });
      }
			const passwordKey = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64');
      if(passwordKey === user.password){
        return done(null, user);
			}else{
        return done(null, false, {message: 'Incorrent password', input:"password"})
      }
    } catch (err) {
      return done(err);
    }
  }
));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(session({
  secret: 'secret',
  store: new SequelizeStore({
    db: conn,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000
  }),
  resave: false,
  saveUninitialized: false,
}));
server.use(passport.initialize());
server.use(passport.session());
passport.serializeUser(function(user, done) {
  return done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  Usuario.findByPk(id)
  .then(user=>done(null, user))
  .catch(err => done(err))
});
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});

module.exports = server;
