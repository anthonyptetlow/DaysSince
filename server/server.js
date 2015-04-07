var express = require('express'),
    bodyParser = require('body-parser'),
    debug = require('debug'),
    morgan =  require('morgan'),
    app = express(),
    mongoose   = require('mongoose'),
    session = require('express-session'),
    passport = require('passport');

mongoose.connect('mongodb://localhost:27017/DaysSince'); // connect to our database

app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
// Get Static Files
app.use(express.static(__dirname + '/../public/'));

app.use('/api', function (req, res, next) {
    if(req.session.passport && req.session.passport.user && req.session.passport) {
        console.log(req.session.passport.user.id);
    }
    next();
});
app.use('/api', morgan('dev'));
app.use('/api/entries', require('./modules/authenticationCheck'), require('./routes/entry'));
app.use('/api/auth/twitter', require('./routes/twitter'));

app.use(require('./modules/notFound'));
app.use(require('./modules/handleError'));

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
