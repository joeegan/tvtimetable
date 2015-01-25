var http = require('http');
var xml2js = require('xml2js');
var adapt = require('./adapters/episode');
var url = 'http://services.tvrage.com/feeds/showinfo.php?sid=';


var episode = function(showId, callback) {
   http.get(url + showId, function(res) {
      console.log('getting', url + showId);
      var xml = '';
      res.on('data', function(chunk) {
         xml += chunk;
      });

      res.on('end', function() {
         xml2js.parseString(xml, function (err, result) {
            return callback(adapt(result));
         });
      });
   });
}

module.exports = episode;