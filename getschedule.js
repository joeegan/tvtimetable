var http = require("http");
var jsonData;

http.get("http://services.tvrage.com/tools/quickschedule.php?country=GB", function(res) {
  var str = '';
  res.on('data', function (chunk) {
    str += chunk;
  });

  res.on('end', function () {
  	jsonData = format(str);
  	console.log('formatted');
  });
});

function findContent(str) {
	var match = str.match(/\[.*\](.*)\[\/.*\]/);
	return match ? match[1] : '';
}

function grabType(str) {
	var match = str.match(/\[([A-Z]*)\]/i);
	return match ? match[1] : '';
}

function grabKey(str) {
	return str.replace(',','').replace(/\s/g, '');
}

function format(text){
	var arr = text.split('\n');
	var dayCode, timeKey;
	var timeIdx = 0;
	var json = {};
	arr.forEach(function(item, idx){
		var content = findContent(item);
		if (grabType(item) == "DAY") {
			dayCode = grabKey(content);
			json[dayCode] = [];
		}
		if (grabType(item) == "TIME") {
			timeKey = grabKey(content);
			json[dayCode][timeKey] = [];
		}
		if (grabType(item) == "SHOW") {
			json[dayCode][timeKey].push({
				channel: content.match(/^(.*?)\^/)[1],
				showName: content.match(/^(.*?)\^(.*?)\^/)[2]
			});
		}

	});
	return json;
}

module.exports = function(cb){
    if (typeof jsonData != 'undefined'){
    	console.log('hitting callback');
        cb(jsonData);
    } else {
    	console.log('in else');
        callback = cb;
    }
}