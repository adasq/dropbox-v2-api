var dropbox = require('../dropbox-api.js');
var fs = require('fs');
var path = require('path');

var credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//set token authentication:
dropbox.authenticate({
	token: credentials.TOKEN
});

//api call:
dropbox({
	resource: 'users/get_current_account'
}, function callback(err, response){
	if(err){ return console.log('err:', err); }
	console.log(response);
});


// dropbox({
// 	resource: 'files/upload',
// 	parameters: {
// 		'path': '/dropbox-api.js'
// 	},
// 	readStream: fs.createReadStream('./dropbox-api.js')
// }, cb);
