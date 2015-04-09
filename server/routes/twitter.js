var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY = "hNCXNBeCfWrv4SjpFFbAT4ZFg";
var TWITTER_CONSUMER_SECRET = "hBlrslQVAHZWLoEFkI1XWeWTcFndtIcQUBzdbaAPnjpYFhYpJ9";

var hostUrl = process.env.NODE_HOST || 'http://localhost:5000';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: hostUrl + "/api/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    console.log(token);
    console.log(tokenSecret);
    // console.log(profile);
    process.nextTick(function () {

      // To keep the example simple, the user's Twitter profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Twitter account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

 // Initialize Passport!  Also use passport.session() middleware, to support
 // persistent login sessions (recommended).
router.use(passport.initialize());
router.use(passport.session());

router.get('/',
	passport.authenticate('twitter'),
	function(req, res){
    // The request will be redirected to Twitter for authentication, so this
    // function will not be called.
  	}
);

// GET /auth/twitter/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/callback',
  passport.authenticate('twitter', { successRedirect: '/#/app', failureRedirect: '/login' }));


module.exports = router;
