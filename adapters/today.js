var moment = require('moment');
var episode = require('../episode');

var today = function(data) {
	var day;
	var dayStr;
	var momentTime;

	// Pick out todays data
	for (var d in data.schedule.DAY) {
		dayStr = data.schedule.DAY[d].$.attr;
		if (moment(dayStr, "YYYY-MM-DD").isSame(moment(), 'day')) {
			day = data.schedule.DAY[d];
			continue;
		}
	}

	// Filter the current and future shows
	return day.time.filter(function(item, idx, arr) {
		momentTime = moment(item.$.attr, "hh:mm a");
		return momentTime.isAfter(moment().subtract(1, 'hours'));

	// Tweak the data structure
	}).map(function(item, idx, arr){
		return {
			time: item.$.attr,
			show: item.show.map(function(item, idx, arr){
				return {
					name: item.$.name,
					sid: item.sid[0],
					network: item.network[0],
					ep: item.ep[0]
					//, duration: episode(item.sid[0])
				}
			})
		}
	});

}

module.exports = today;