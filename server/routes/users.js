var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/all', function (req, res) {

	User.find(function (error, users) {
		console.log(users);
		if (error) res.status(500).send(error);
		res.json(users);	
	});

});

router.get('/:id', function (req, res) {
	User.findById(req.params.id, function (error, user) {
		if (error) res.status(500).send(error);
		res.json(user);
	});
});

router.post('/', function (req, res) {
	var newUser = new User();
	console.log(req.body.username);
	newUser.username  = req.body.username;
	newUser.email = req.body.email;
	newUser.passwordHash;
	// newUser.salt
	newUser.isActivated = false;

	newUser.save(function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	});
});



// router.put('/:id', function (req, res) {
// 	var db = req.db;
// 	var collection = db.get('usercollection');
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

router.delete('/:id', function (req, res) {
	User.findByIdAndRemove(req.params.id, function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	})
});

module.exports = router;