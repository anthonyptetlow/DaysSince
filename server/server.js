var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug');
var morgan =  require('morgan');
var app = express();
var indexRoutes = require('./routes/index');
var usersRoutes = require('./routes/users');

// New Code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');

app.set('port', 3000);

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Update this to reflect static files get angular app
app.use(express.static(__dirname + '/../client/build/'));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/api', indexRoutes);
app.use('/api/user', usersRoutes);

app.use(require('./modules/notFound'));
app.use(require('./modules/handleError'));

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
