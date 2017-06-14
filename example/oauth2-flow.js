/**
 * To run example you have to create 'credentials.json' file
 * in current location.
 * 
 * File should contain JSON object, with 'APP_KEY' and 'APP_SECRET' properties.
 * 
 * Do not forget to specify 'http://localhost:5000/oauth' in 'Redirect URIs'
 * section of your dropbox app settings.
 */

const dropboxV2Api = require('../src/dropbox-api.js');
const Hapi = require('hapi');
const fs = require('fs');
const path = require('path');
const Opn = require('opn');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//set auth credentials
const dropbox = dropboxV2Api.authenticate({
	client_id: credentials.APP_KEY,
	client_secret: credentials.APP_SECRET,
	redirect_uri: 'http://localhost:5000/oauth'
});

//prepare server & oauth2 response callback
const server = new Hapi.Server();
server.connection({ port: 5000 });
server.route({
        method: 'GET',
        path: '/oauth',
        handler: function (request, reply) {
        	var params = request.query;
        	dropbox.getToken(params.code, function(err, response){
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
	Opn(dropbox.generateAuthUrl());
});