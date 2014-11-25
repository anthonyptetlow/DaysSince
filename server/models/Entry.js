var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId     = mongoose.Schema.Types.ObjectId;

var EntrySchema = new Schema({
	userId: ObjectId,
	title: String,
	dates: [Date]
});

module.exports = mongoose.model('Entry', EntrySchema);
