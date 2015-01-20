function colour(divJq) {
	return divJq.addClass('a' + getRandomInt(0,4));
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
$(function(){
	var container = $('.container');
	$.getJSON('./desired.json').then(function(data) {
		var times = data.times;
		for (var i=0; i < times.length; i++) {
			var time = times[i].time;
			var shows = times[i].shows;
			var div = $('<div/>');
			div.append('<h2>' + time + '</h2>' );
			for (var j=0; j < shows.length; j++) {
				var show = shows[j];
				div.append('<p>' + show.name + '<span>' + show.channel + '</span></p>' );
			}
			container.append(colour(div));
		}
	});
});
;