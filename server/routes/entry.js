var express = require('express');
var router = express.Router();

var Entry = require('../models/Entry');

function getUserId(session) {
	if (session.passport && session.passport.user && session.passport.user.id) {
		return session.passport.user.id;		
	}
	return undefined;
}

router.use('/', function (req, res, next) {
	getUserId(req.session) ? next(): res.status(401);
});

router.get('/', function (req, res) {
	Entry.find({userId : getUserId(req.session)} ,function (error, entries) {
		if (error) res.status(500).send(error);
		res.json(entries);
	});
});

router.get('/:id', function (req, res) {
	Entry.findById(req.params.id, function (error, entry) {
		if (error) res.status(500).send(error);

		if (entry.userId !== getUserId(req.session)) {
			res.status(404).send("No Entry Found");
		}

		res.json(entry);
	});
});

router.post('/', function (req, res) {
	var newEntry = new Entry();
	newEntry.title  = req.body.title;
	newEntry.userId = getUserId(req.session);
	newEntry.dates = [new Date()];
	newEntry.save(function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	});
});


router.put('/:id/addEvent', function (req, res) {
	console.log(req.params.id);
	Entry.findById(req.params.id, function (error, entry) {
	  	if (error) {
	  		console.log('error1');
	  		res.status(500).send(error);
	  	} else if (entry.userId !== getUserId(req.session)) {
	  		console.log('error2');
			res.status(500).send("Unable to update entry");
		} else {
		  	entry.dates.push(new Date());
			entry.save(function (error) {
			  	if (error) {
			  		console.log('error2');
			  		res.status(500).send(error)
				} else {
			  		console.log('Success');
					res.status(200).end();
		  		}
		  	});
		}
	});	
});


router.put('/:id', function (req, res) {
	Entry.findById(req.params.id, function (error, entry) {
	  	if (error) {
	  		res.status(500).send(error);
		} else if (entry.userId !== getUserId(req.session)) {
			res.status(500).send("Unable to update entry");
		} else {
		  	entry.title = req.body.title;
			entry.save(function (error) {
			  	if (error) res.status(500).send(error);
				res.status(200).end();
		  	});
	  	}
	});	
});



router.delete('/:id', function (req, res) {
	Entry.findById(req.params.id, function (error, entry) {
		if (error) {
			res.status(500).send(error);
		} else if (entry.userId !== getUserId(req.session)) {
			res.status(500).send("Unable to update entry");
		} else {
		entry.remove();
		res.status(200).end();
	
		}
	});
});

module.exports = router;