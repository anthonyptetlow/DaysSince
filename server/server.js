var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug');
var morgan =  require('morgan');
var app = express();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database

app.set('port', 3000);

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Update this to reflect static files get angular app
app.use(express.static(__dirname + '/../client/build/'));

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
