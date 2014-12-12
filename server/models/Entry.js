var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrySchema = new Schema({
	userId: String,
	title: String,
	dates: [Date]
});

module.exports = mongoose.model('Entry', EntrySchema);
