var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug');

// var expressValidator = require('express-validator'),

var morgan =  require('morgan');
var app = express();
var indexRoutes = require('./routes/index');
var entryRoutes = require('./routes/entry');
var usersRoutes = require('./routes/users');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database


app.use(express.bodyParser());
// app.use(expressValidator());

app.set('port', 3000);

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Update this to reflect static files get angular app
app.use(express.static(__dirname + '/../client/build/'));


app.use('/api', indexRoutes);
app.use('/api/entry', entryRoutes);
app.use('/api/user', usersRoutes);

app.use(require('./modules/notFound'));
app.use(require('./modules/handleError'));

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
