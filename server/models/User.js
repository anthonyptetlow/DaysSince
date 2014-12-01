var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	email: String,
	passwordHash: String,
	salt: String,
	isActivated: Boolean
});

module.exports = mongoose.model('User', UserSchema);
