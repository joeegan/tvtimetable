var http = require('http');
var xml2js = require('xml2js');
var url = 'http://services.tvrage.com/feeds/showinfo.php?sid=';

var episode = function(showId, callback) {
   console.log('showId', showId);
   http.get(url + showId, function(res) {
      var xml = '';
      res.on('data', function(chunk) {
         xml += chunk;
      });

      res.on('end', function() {
         xml2js.parseString(xml, function (err, result) {
            console.log('episode json', result);
            return callback(result);
         });
      });
   });
}

module.exports = episode;