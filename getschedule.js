var http = require("http");
var jsonData;


http.get("http://services.tvrage.com/tools/quickschedule.php?country=GB", function(res) {
  var str = '';
  res.on('data', function (chunk) {
    str += chunk;
  });

  res.on('end', function () {
  	jsonData = format(str);
  });
});

function findContent(str) {
	var match = str.match(/\[.*\](.*)\[\/.*\]/);
	return match ? match[1] : '';
}

function findType(str) {
	var match = str.match(/\[([A-Z]*)\]/i);
	return match ? match[1] : '';
}

function findKey(str) {
	return str.replace(',','').replace(/\s/g, '');
}

function format(text){
	var arr = text.split('\n');
	var dayCode, timeKey;
	var timeIdx = 0;
	var json = {};
	arr.forEach(function(item, idx){
		var content = findContent(item);
		if (findType(item) == "DAY") {
			dayCode = findKey(content);
			json[dayCode] = {};
		}
		if (findType(item) == "TIME") {
			timeKey = findKey(content);
			json[dayCode][timeKey] = [];
		}
		if (findType(item) == "SHOW") {
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
        cb(jsonData);
    } else {
        callback = cb;
    }
}