var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug');
var morgan =  require('morgan');
var app = express();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY = "hNCXNBeCfWrv4SjpFFbAT4ZFg";
var TWITTER_CONSUMER_SECRET = "hBlrslQVAHZWLoEFkI1XWeWTcFndtIcQUBzdbaAPnjpYFhYpJ9";


app.set('port', 3000);

app.use('/api', morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// Update this to reflect static files get angular app
app.use(express.static(__dirname + '/../client/build/'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
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
  app.use(passport.initialize());
  app.use(passport.session());

app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
    // The request will be redirected to Twitter for authentication, so this
    // function will not be called.
  });

// GET /auth/twitter/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
  	console.log("Authenticated");
  	console.log(req, res);
    res.redirect('/');
  });


// app.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });




var indexRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');
var entryRoutes = require('./routes/entry');

app.use('/api', indexRoutes);
app.use('/api/user', usersRoutes);
app.use('/api/entry', entryRoutes);

app.use(require('./modules/notFound'));
app.use(require('./modules/handleError'));

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
