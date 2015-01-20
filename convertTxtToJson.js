var http = require("http");

http.get("http://services.tvrage.com/tools/quickschedule.php?country=GB", function(res) {
  console.log("Got response: " + res.statusCode);
  var str = '';
  res.on('data', function (chunk) {
    str += chunk;
  });

  res.on('end', function () {
    console.log(format(str));
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

	})
	return json;
}