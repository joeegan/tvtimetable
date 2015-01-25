var moment = require('moment');
var q = require('q');
var episode = require('../episode');
var promises = [ ];

var today = function(data, callback) {
	var day;
	var dayStr;
	var momentTime;
	var t; // Today's data;
	var duration;

	// Pick out todays data
	for (var d in data.schedule.DAY) {
		dayStr = data.schedule.DAY[d].$.attr;
		if (moment(dayStr, "YYYY-MM-DD").isSame(moment(), 'day')) {
			day = data.schedule.DAY[d];
			continue;
		}
	}

	// Filter the current and future shows
	t = day.time.filter(function(item, idx, arr) {
		momentTime = moment(item.$.attr, "hh:mm a");
		return momentTime.isAfter(moment().subtract(1, 'hours'));
	});

	// Tweak the data structure
	t = t.map(function(item, idx, arr){
		return {
			time: item.$.attr,
			shows: item.show.map(function(item, idx, arr){
				return {
					name: item.$.name,
					sid: item.sid[0],
					network: item.network[0],
					ep: item.ep[0]
				}
			})
		}
	});

	// Furnish each show with the runtime property (requires querying the episode endpoint)
	t.forEach(function(item, idx){
		item.shows.forEach(function(item, idx){
			var deferred = q.defer();
			promises.push(deferred.promise);
			episode(item.sid, function(data){
				item.runtime = data.runtime;
				deferred.resolve(data);
			});
		});
	});

	// Once all the episode data has been retrieved, make the callback
	q.all(promises).then(function(episodeData){
		callback(t);
	});
}

module.exports = today;