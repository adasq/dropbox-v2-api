/**
 * To run example you have to create 'credentials.json' file
 * in current location.
 * 
 * File should contain JSON object, with 'APP_KEY' and 'APP_SECRET' properties.
 * 
 * Do not forget to specify 'http://localhost:4000/oauth' in 'Redirect URIs'
 * section of your dropbox app settings.
 */

const dropboxV2Api = require('../src/dropbox-api.js');
const Hapi = require('@hapi/hapi');
const fs = require('fs');
const path = require('path');
const Opn = require('opn');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//set auth credentials
const dropbox = dropboxV2Api.authenticate({
	client_id: credentials.APP_KEY,
	client_secret: credentials.APP_SECRET,
	token_access_type: 'offline',
	redirect_uri: 'http://localhost:4000/oauth'
});

//prepare server & oauth2 response callback
(async () => {
	const server = Hapi.server({
		port: 4000,
		host: 'localhost'
	});

	server.route({
		method: 'GET',
		path: '/oauth',
		handler: function (request, h) {
			var params = request.query;

			return new Promise((resolve) => {
				dropbox.getToken(params.code, function (err, response) {
					console.log(err);
					console.log('user\'s access_token: ', response.access_token);
					console.log('user\'s refresh_token: ', response.refresh_token);
					//call api
					dropbox({
						resource: 'users/get_current_account'
					}, function (err, response) {
						console.log(err);
						resolve(response);
					});
					//or refresh token!
					dropbox.refreshToken(response.refresh_token, (err, result) => {
						console.log(err);
						console.log(result);
					})
				});
			})
		}
	});

	await server.start();
	Opn(dropbox.generateAuthUrl());
	console.log('Server running on %s', server.info.uri);
})()
