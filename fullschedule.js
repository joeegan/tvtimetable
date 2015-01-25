/*
 * Stores a fresh copy of the full schedule from tvrage in memory, every midnight.
 */

var cron = require('cron');
var http = require('http');
var xml2js = require('xml2js');
var fs = require('fs');
var url = 'http://services.tvrage.com/feeds/fullschedule.php?country=UK';
var cache = './cache/fullschedule.json'

// When the app starts, the fullSchedule is read from the cache, but in memory it will be updated at midnight.
var fullSchedule = fs.readFile(cache, function (err, data) {
  if (err) throw err;
  console.log('read cache');
  return data;
});

var getData = function(){
    http.get(url, function(res) {
      var xml = '';
      res.on('data', function(chunk) {
        xml += chunk;
      });

      res.on('end', function() {
        console.log('in write');
        xml2js.parseString(xml, function (err, result) {
            fullschedule = result;
            fs.writeFileSync(cache, JSON.stringify(result));
        });
      });
    });
}

getData();
new cron.CronJob('00 01 00 * * *', getData); 

module.exports = fullSchedule;