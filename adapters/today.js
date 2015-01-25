var moment = require('moment');
moment().format();

var today = function(data) {
	return data.schedule.DAY[1].time.map(function(item, idx, arr){
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
		var momentTime = moment(item.time, "hh:mm a");
		return momentTime.isAfter(moment().subtract(1, 'hours'));
	});
}
module.exports = today;