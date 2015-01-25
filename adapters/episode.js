var moment = require('moment');

function formatRuntime(runtime) {
	// Should probably ditch moment here...
	var mDuration = moment.duration(runtime, "minutes"); 
	var hoursLong = Math.floor(mDuration.asHours());
	var minutesLong = mDuration.asMinutes();
	var r; // The formatted runtime.
	if (hoursLong) {
		minutesLong = mDuration.asMinutes() - hoursLong * 60;
		r = hoursLong + 'hr'
		if (minutesLong) {
			r += ' ' + minutesLong + 'mins';
		}
		return r;
	} else {
		return minutesLong + 'mins';
	}
	return r;
}

// Converts episode JSON data into suitable format for consumers
var episode = function(data) {
	var d = data.Showinfo;
	d.runtime = formatRuntime(+d.runtime[0]);
	return d;
}

module.exports = episode;