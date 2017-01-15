var dropbox = require('../dropbox-api.js');
var fs = require('fs');
var path = require('path');

var credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//set token authentication:
dropbox.authenticate({
	token: credentials.TOKEN
});

			dropbox({
				resource: 'users/get_account_batch',
				parameters: {
					account_ids: ['dbid:AAD6ohziJisQr3HsC9gQc4R-wW4d8Xe_Qic']
				}
			}, function callback(err, response){
				if(err){ throw err; }
				console.log(response);				
			});
