var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('berhasil');
});
router.post('/signin', function(req, res, next) {
  res.send('berhasil');
});
router.post('/signup', function(req, res, next) {
  let email = req.body.email
  let password = req.body.password
  res.send('berhasil');
});

router.get('/profile', function(req, res){
  res.send('profile')
})

router.get('/auth/twitter', passport.authenticate('twitter'));

// handle the callback after twitter has authenticated the user
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect : '/profile',
    failureRedirect : '/'
}));

module.exports = router;
