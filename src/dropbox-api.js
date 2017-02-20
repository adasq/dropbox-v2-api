const request = require('request');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const _ = require('underscore');

//-------------------------------------------------------------------

var config = {};

const DB_HEADER_API_ARGS = 'Dropbox-API-Arg';
const DB_HEADER_API_RESULT = 'dropbox-api-result';
const OAUTH2_AUTHORIZE= 'https://www.dropbox.com/1/oauth2/authorize';
const OAUTH2_TOKEN= 'https://api.dropboxapi.com/1/oauth2/token';


var parsedApiDescription = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/api.json')));
module.exports = generateAPIByParsedApiDescription(parsedApiDescription);

//-------------------------------------------------------------------

function throwError(content){
	throw content;
}

var cusomizeRequestObjectMiddleware = [
	function requiresAuthHeader(requestOpts, resourceDescription, userOpts, config){
				if(resourceDescription.requiresAuthHeader){
					if(!config.token){
						throwError('No "token" specified!');
					}
					requestOpts.headers['Authorization']= "Bearer "+config.token;
				}
	},
	function requiresReadableStream(requestOpts, resourceDescription, userOpts){						
				if(resourceDescription.requiresReadableStream){
					if(!userOpts.readStream){
						// throwError('No readable stream specified!');
					}
					requestOpts.headers['Content-Type']= 'application/octet-stream';
				}
	},
	function prepareValidEndpoint(requestOpts, resourceDescription, userOpts, config){						
				if(resourceDescription.category === 'RPC'){
					requestOpts.body = resourceDescription.parameters.list.length > 0 ? userOpts.parameters : null;
				}else if(resourceDescription.category === 'UPLOAD' || resourceDescription.category === 'DOWNLOAD'){
					requestOpts.headers[DB_HEADER_API_ARGS] = _.isObject(userOpts.parameters) ? JSON.stringify(userOpts.parameters): '';
				}
	}	
];

function createTransformStream() {
	const streamInstance = new stream.Transform();
	streamInstance._transform = function (chunk,encoding,done) {
		this.push(chunk);
		done();
	};
	return streamInstance;
}

function prepareAPIMethods(parsedApiDescription){
	var resources = {};
	_.each(parsedApiDescription, function(resourceDescription, resourceName){
			resources[resourceName] = function(opt, cb){
				//default request object
				var requestOpts = {
					method: 'POST',
					uri: resourceDescription.uri,
					json: true,
					followRedirect: false,
					headers: {}
				};
				//prepare requestOpts based on userOpts, config, etc.
				_.each(cusomizeRequestObjectMiddleware, function(fn){
					fn(requestOpts, resourceDescription, opt, config);
				});
				//-------------------------------------------------------
				//send request
				
				
				if(resourceDescription.category === "UPLOAD"){
					//it's upload type request, so pipe
					if(opt.readStream){
						// read stream specified, so pipe it
						return opt.readStream.pipe(request(requestOpts, callback));
					}else {
						// readStream not specified, so return writable stream
						return request(requestOpts, callback);
					}
				}else if(resourceDescription.category === "DOWNLOAD"){
					return request(requestOpts, callback).pipe(createTransformStream());
				}else {
					//ordinary api call/download request 
					return request(requestOpts, callback);
				}
				//-------------------------------------------
				function callback(err, response, body){
						const statusCode = response.statusCode;
						var contentType = {
							'application/octet-stream': () => {
								if(response.headers[DB_HEADER_API_RESULT]){
									return cb(null, JSON.parse(response.headers[DB_HEADER_API_RESULT]));
								}
							},
							'application/json': () => {
								const json = body;
								if(statusCode === 200) {
									return cb(null, json);
								}else {
									json.code = statusCode;
									return cb(json);
								}								
							},
							'text/plain; charset=utf-8': () => {
								const text = body;
								if(statusCode === 200) {
									return cb(null, text);
								}else{
									return cb({
										code: statusCode,
										text: text
									});
								}		
							}
						};
						if(contentType[response.headers['content-type']]){
							contentType[response.headers['content-type']]();
						} else{
							cb(err);
						}
				}
			};
	});
	return resources;
}

function generateAPIByParsedApiDescription(parsedApiDescription){
	var apiMethods = prepareAPIMethods(parsedApiDescription);
	var api = function(userOpt, cb){
		var opt = _.extend({
			parameters: {},
			resource: ''
		}, userOpt);
		cb = cb || function(){};
		if(apiMethods[opt.resource]){
			return apiMethods[opt.resource](opt, cb);
		}else{
			throwError(`resource "${opt.resource}" is invalid.`);
		}
	};	
	api.authenticate = function(_config){
		 config = _config;
		 return {
		 	generateAuthUrl: function(input){
		 		return OAUTH2_AUTHORIZE+'?client_id='+config.client_id+'&response_type=code&redirect_uri='+config.redirect_uri;
		 	},
		 	getToken: function(code, cb){
		 		request({
					method: 'POST',
					uri: OAUTH2_TOKEN,
					followRedirect: true,
					json: true,
					form: {
						code: code,
						client_id: config.client_id,
						client_secret: config.client_secret,
						grant_type: 'authorization_code',
						redirect_uri: config.redirect_uri
					}
				}, function(err, resp, body){
					if(err || body.error){
						cb(body.error || {});
					}
					config.token = body.access_token;
					cb(false, body);
				});
		 	}
		 }

	};
	return api;
}
