// Web server for an opinion-sharing site
const express = require('express');
const server = express();

// Parse request bodies
server.use(express.urlencoded({extended: true}));

// Set up a session
const session = require('express-session');
server.use(session({
  name: 'QRC',
  resave: false,
  saveUninitialized: false,
  secret: require('../secret'),
}));

// Set up authentication
const passport = require('passport');
server.use(passport.initialize());
server.use(passport.session());

// Authenticate using Google OAuth
const AuthenticationStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new AuthenticationStrategy(require('../credentials'),
  function(accessToken, refreshToken, profile, done) {
    user = {id: profile.id, name: profile.displayName};
    return done(null, user);
  }
));

// Track the user with a cookie
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Ignore icon requests
server.get('/favicon.ico', function(request, response) {
  response.sendStatus(204);
});

// Logging
server.use(function(request, response, next) {
  console.log(request.method, request.url, request.body, request.user);
  next();
});

// Front end routes
server.use(express.static('front', {extensions: ['html']}));

// Back end APIs, how stupid am I to forget this?
server.use('/mentors', require('./back/mentors'));
server.use('/staffs', require('./back/staffs'));
server.use('/shifts', require('./back/shifts'));
server.use('/eval', require('./back/evaluation'));

// Login routes
server.get('/auth', passport.authenticate('google', {scope: ['profile']}));
server.get('/auth/callback', passport.authenticate('google'),
  (request, response) => response.redirect(request.headers.referer || '/')
);

// Route for asking who is logged in
server.get('/user', (request, response) => response.send(request.user));

// Logout route
server.get('/logout', function(request, response) {
  request.logout();
  response.redirect(request.headers.referer || '/');
});

// Error handling
server.use(function(error, request, response, next) {
  console.log(error.stack);

  switch(error.message) {
    case 'Bad request':
    case 'Document failed validation':
      response.sendStatus(400);
      break;
    case 'Forbidden':
      response.sendStatus(403);
      break;
    case 'Not found':
    case 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters':
      response.sendStatus(404);
      break;
    default:
      response.sendStatus(500);
  }
});

// Server is up
server.listen(3000);
