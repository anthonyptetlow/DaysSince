var express = require('express');
var router = express.Router();

var Entry = require('../models/Entry');

router.get('/all/', function (req, res) {
	Entry.find(function (error, entries) {
		if (error) res.status(500).send(error);
		res.json(entries);
	});
});

router.get('/all/:userId', function (req, res) {
	Entry.find({userId : req.params.userId} ,function (error, entries) {
		if (error) res.status(500).send(error);
		res.json(entries);
	});
});

router.get('/:id', function (req, res) {
	Entry.findById(req.params.id, function (error, entry) {
		if (error) res.status(500).send(error);
		res.json(entry);
	});
});

router.post('/', function (req, res) {
	var newEntry = new Entry();
	newEntry.title  = req.body.title;
	newEntry.userId = req.body.userId;
	newEntry.dates = [new Date()];
	newEntry.save(function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	});
});

router.put('/:id', function (req, res) {
	Entry.findById(req.params.id, function (error, entry) {
	  	if (error) res.status(500).send(error)
	  	entry.title = req.body.title;
		entry.save(function (error) {
		  	if (error) res.status(500).send(error)
			res.status(200).end();
	  	});
	})	
});

router.put('/:id/addEvent', function (req, res) {
	Entry.findById(req.params.id, function (error, entry) {
	  	if (error) res.status(500).send(error)
	  	entry.dates.push(new Date());
		entry.save(function (error) {
		  	if (error) res.status(500).send(error)
			res.status(200).end();
	  	});
	})	
});


router.delete('/:id', function (req, res) {
	Entry.findByIdAndRemove(req.params.id, function (error) {
		if (error) res.status(500).send(error);
		res.status(200).end();
	})
});

module.exports = router;