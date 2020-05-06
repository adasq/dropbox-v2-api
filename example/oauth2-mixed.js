/**
 * To run example you have to create 'credentials.json' file
 * in current location.
 * 
 * File should contain JSON object, with 'APP_KEY', 'APP_SECRET' and 'TOKEN' properties.
 * 
 * Do not forget to specify 'http://localhost:5000/oauth' in 'Redirect URIs'
 * section of your dropbox app settings.
 */

const dropboxV2Api = require('../src/dropbox-api.js');
const Hapi = require('@hapi/hapi');
const fs = require('fs');
const path = require('path');
const Opn = require('opn');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//setup two separated sessions, dropboxSession1 and dropboxSession2
const dropboxSession1 = dropboxV2Api.authenticate({
	client_id: credentials.APP_KEY,
	client_secret: credentials.APP_SECRET,
	redirect_uri: 'http://localhost:5000/oauth'
});

const dropboxSession2 = dropboxV2Api.authenticate({
	token: credentials.TOKEN
});

//prepare server & oauth2 response callback
(async () => {
	const server = Hapi.server({
		port: 5000,
		host: 'localhost'
	});

	server.route({
		method: 'GET',
		path: '/oauth',
		handler: function (request, h) {
			var params = request.query;

			return new Promise((resolve) => {
				dropboxSession1.getToken(params.code, function (err, response) {
					//call api
					dropboxSession1({
						resource: 'users/get_current_account'
					}, function (err, dropboxSession1Response) {
						dropboxSession2({
							resource: 'users/get_current_account'
						}, function (err, dropboxSession2Response) {
							resolve({
								'dropboxSession1 response': dropboxSession1Response.name.display_name,
								'dropboxSession2 response': dropboxSession2Response.name.display_name
							});
						});
					});
				});
			})
		}
	});

	await server.start();
	Opn(dropboxSession1.generateAuthUrl());
	console.log('Server running on %s', server.info.uri);
})()
