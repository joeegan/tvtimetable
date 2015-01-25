var express = require('express');
var router = express.Router();
var today = require('../adapters/today');

router.get('/today', function(req, res, next) {
	res.send(today(fullschedule));
});

module.exports = router;
