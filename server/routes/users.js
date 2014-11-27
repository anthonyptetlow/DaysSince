var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function (req, res) {
	User.find(function (error, users) {
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
	newUser.username  = req.body.username;
	newUser.email = req.body.email;
	newUser.passwordHash = 'newHash';
	// newUser.salt
	newUser.isActivated = false;

	newUser.save(function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	});
});

router.put('/:id', function (req, res) {
	User.findById(req.params.id, function (error, user) {
	  	if (error) res.status(500).send(error)
	  	user.username = req.body.username;
	  	user.email = req.body.email;
		user.save(function (error) {
		  	if (error) res.status(500).send(error)
			res.status(200).end();
	  	});
	})	
});

router.delete('/:id', function (req, res) {
	User.findByIdAndRemove(req.params.id, function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	})
});

module.exports = router;