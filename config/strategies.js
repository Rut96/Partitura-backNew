const passport = require('passport');
// const db = require('./db');
const { localStrategyHandler, googleStrategyHandler, facebookStrategyHandler } = require('./passportHandlers')

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const { google, facebook } = require('./secrets');

// Used to serialize the user for the session
passport.serializeUser(function (user, done) {
  return done(null, user);
});

// Used to deserialize the user
passport.deserializeUser(function (user, done) {
  return done(null, user);
});

// Set Local Strategy for authentication
passport.use('local',
  new LocalStrategy(localStrategyHandler)
);

passport.use('google',
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: '/auth/google/callback', // Your callback URL
    },
    googleStrategyHandler
  )
);

passport.use('facebook',
  new FacebookStrategy(
    {
      clientID: facebook.clientID,
      clientSecret: facebook.clientSecret,
      callbackURL: '/auth/facebook/callback', // Your callback URL
    },
    facebookStrategyHandler
  )
);