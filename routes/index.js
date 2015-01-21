var express = require('express');
var router = express.Router();
var schedule = require('../getschedule');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('pre schedule fetch')
	schedule(function(data){
		console.log('post schedule fetch');
	  	res.render('index', {data: data});
	})
});

module.exports = router;
