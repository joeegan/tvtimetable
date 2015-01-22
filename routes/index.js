var express = require('express');
var router = express.Router();
var schedule = require('../getschedule');

/* GET home page. */
router.get('/', function(req, res, next) {
	schedule(function(data){
		var today = data[Object.keys(data)[0]];
	  	res.render('index', {
	  		data: today,
	  		strData: JSON.stringify(today)
	  	});
	})
});

module.exports = router;
