var express = require('express');
var router = express.Router();
var collectionNames = require('../conf/config').collectionNames;


function safeCreateEntry(req) {
	// Insert checking on userId
	var userCollection = req.db.get(collectionNames.userList);
	collection.find()

	if (req.body.title && req.body.userId) {
		var entry = {};
		entry.title = req.body.title;
		entry.userId = req.body.userId;
		entry.dates = [new Date()];
		return entry;
	}
	return null;
}

// router.get('/all', function (req, res) {
// 	var db = req.db;
// 	var collection = db.get(collectionNames.entryList);
// 	collection.find({},{}, function (error, docs) {
// 		res.json(docs);	
// 	});
// });

// router.get('/:id', function (req, res) {
// 	var db = req.db;
// 	var collection = db.get(collectionNames.entryList);
// 	var userToGet = req.params.id;
// 	collection.findById(userToGet, function (error, docs) {
// 		console.log(docs);
// 		res.json(docs);	
// 	});
// });

router.post('/', function (req, res) {
	var db = req.db;
	var collection = db.get(collectionNames.entryList);

	var entry = safeCreateEntry(req);

	if (!entry) {
		res.status(500).send("Invalid Body Data");	
	} else {
		collection.insert(
			entry,
			function (err, doc) {
				if (err) {
		            res.status(500).send("There was a problem adding the information to the database.");
				} else {
					res.status(200).end();
				}
			}
		);
	}
});

// router.put('/:id', function (req, res) {
// 	var db = req.db;
// 	var collection = db.get(collectionNames.entryList);
// 	var userToGet = req.params.id;
	
// 	console.log(req.body);
// 	var userName = req.body.userName;
// 	var userEmail = req.body.userEmail;

// 	collection.findAndModify({_id: userToGet}, {
// 		'userName': userName,
// 		'userEmail': userEmail
// 	}, function (err, doc) {
// 		if (err) {
//             res.send(500, "There was a problem adding the information to the database.");
// 		} else {
// 			res.status(200).end();
// 		}
// 	});
// });

// router.delete('/:id', function (req, res) {
// 	var db = req.db;
// 	var collection = db.get(collectionNames.entryList);
// 	var userToDelete = req.params.id;
// 	collection.remove({_id: userToDelete}, function(err, result) {
// 		if (result === 1) {
// 			res.status(200).end();
// 		} else {
// 			res.status(500).send({ msg:'error: ' + err });
// 		}
//     });
// });

module.exports = router;