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


router.get('/:user/salt', function (req, res) {
	User.find({ username: req.params.user }, function (error, user) {
		if (error) res.status(500).send(error);
		if (user.length === 1) {
			res.json({salt: user.salt});
		} else {
			User.find({ email: req.params.user }, function (error, user) {
				if(error) res.status(500).send(error);
				if(user.length === 0) {
					res.status(404).send({error: {message: 'User not found', code: 'NO_USER'}});
				} else {
					res.json({salt: user.salt});
				}
			});
		}
	});
});

router.post('/register', function (req, res) {
	var newUser = new User();
	newUser.username = req.body.username;
	newUser.email = req.body.email;
	newUser.salt = req.body.salt;
	newUser.passwordHash = req.body.passwordHash;
	newUser.isActivated = false;
	newUser.save(function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	});
});





module.exports = router;