var moment = require('moment');
moment().format();

var today = function(data) {
	var day;
	var dayStr;
	var momentTime;
	for (var d in data.schedule.DAY) {
		dayStr = data.schedule.DAY[d].$.attr;
		if (moment(dayStr, "YYYY-MM-DD").isSame(moment(), 'day')) {
			day = data.schedule.DAY[d];
			continue;
		}
	}
	return day.time.map(function(item, idx, arr){
		return {
			time: item.$.attr,
			show: item.show.map(function(item, idx, arr){
				return {
					name: item.$.name,
					sid: item.sid[0],
					network: item.network[0],
					ep: item.ep[0]
				}
			})
		}
	}).filter(function(item, idx, arr) {
		momentTime = moment(item.time, "hh:mm a");
		return momentTime.isAfter(moment().subtract(1, 'hours'));
	});
}

module.exports = today;