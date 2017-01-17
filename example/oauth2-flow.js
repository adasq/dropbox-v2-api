var dropbox = require('../src/dropbox-api.js');
var Hapi = require('hapi');
var fs = require('fs');
var path = require('path');
var Opn = require('opn');

var credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//set auth credentials
var oauth = dropbox.authenticate({
	client_id: credentials.APP_KEY,
	client_secret: credentials.APP_SECRET,
	redirect_uri: 'http://localhost:5000/oauth'
});

//prepare server & oauth2 response callback
var server = new Hapi.Server();
server.connection({ port: 5000 });
server.route({
        method: 'GET',
        path: '/oauth',
        handler: function (request, reply) {
        	var params = request.query;
        	oauth.getToken(params.code, function(err, response){
        		console.log('user\'s access_token: ',response.access_token);
        		//call api
        		dropbox({
					resource: 'users/get_current_account'
				}, function(err, response){
					reply({response: response});
				});
        		
        	});                    
        }
});
server.start(function(){
	//open authorization url
	Opn(oauth.generateAuthUrl());
});