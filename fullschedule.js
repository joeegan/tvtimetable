/*
 * Calls the fullschedule endpoint of tvrage.
 */

var http = require('http');
var xml2js = require('xml2js');
var url = 'http://services.tvrage.com/feeds/fullschedule.php?country=UK';

var fullSchedule = function(callback) {
  http.get(url, function(res) {
    var xml = '';
    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('end', function() {
      xml2js.parseString(xml, function (err, result) {
          callback(result);
      });
    });
  });
}

module.exports = fullSchedule;