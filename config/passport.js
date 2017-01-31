
var TwitterStrategy  = require('passport-twitter').Strategy;

// load up the user model
var User       = require('../models').User;

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
  passport.use(new TwitterStrategy({
    consumerKey     : configAuth.twitterAuth.consumerKey,
    consumerSecret  : configAuth.twitterAuth.consumerSecret,
    callbackURL     : configAuth.twitterAuth.callbackURL
  },
  function(token, tokenSecret, profile, done) {
  // make the code asynchronous
  // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() {
      console.log(User);
      User.find({ where: {twitterid : profile.id} }, function(err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);
          // if the user is found then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user, create them
            User.create({
              twitterid   : profile.id,
              token       : token,
              username    : profile.username,
              displayName : profile.displayName
            })
          }
      });
    });
  }));
};
