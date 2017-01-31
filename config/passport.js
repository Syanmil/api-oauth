
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
      User.findOrCreate({where: {twitterid: profile.id}, defaults: {
        token       : token,
        username    : profile.username,
        displayName : profile.displayName
      }})
      .spread(function(user, created) {
        user.get({
          plain: true
        })
      })
    });
  }));
};
