// For parsing the quickschedule provided by tvrge

// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + filename);
  console.log(format(data));
});

function format(text){
	var arr = text.split('[TIME]');
	// arr.map(function(item, idx){
		// return idx + '::::[TIME]' + item;
	// })
	var json = {};
	console.log(arr[0]);
	json.today = (/(?:\[DAY\])(.*)(?:\[\/DAY\])/g).exec(arr[0])[1];
	console.log(arr[1]);
	return json;
}