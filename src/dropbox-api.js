const request = require('request');
const fs = require('fs');
const path = require('path');
const stream = require('stream');

const RPC_RESOURCE_CATEGORY = 'RPC';
const UPLOAD_RESOURCE_CATEGORY = 'UPLOAD';
const DOWNLOAD_RESOURCE_CATEGORY = 'DOWNLOAD';

const DB_HEADER_API_ARGS = 'Dropbox-API-Arg';
const DB_API_RESULT_HEADER_NAME = 'dropbox-api-result';
const OAUTH2_AUTHORIZE= 'https://www.dropbox.com/1/oauth2/authorize';
const OAUTH2_TOKEN= 'https://api.dropboxapi.com/1/oauth2/token';

const RESOURCES_DESCRIPTION_PATH = path.join(__dirname, '../dist/api.json');

// https://www.dropbox.com/developers/reference/json-encoding
var charsToEncode = /[\u007f-\uffff]/g;

// This function is simple and has OK performance compared to more
// complicated ones: http://jsperf.com/json-escape-unicode/4
function http_header_safe_json(v) {
  return JSON.stringify(v).replace(charsToEncode,
    function(c) {
      return '\\u'+('000'+c.charCodeAt(0).toString(16)).slice(-4);
    }
  );
}

const updateRequestOptsFnList = [
	/* For requests, which requires auth header, set valid header */
	(requestOpts, {requiresAuthHeader}, userOpts, config) => {
				if(requiresAuthHeader){
					if(!config.token){
						throwError('No "token" specified!');
					}
					requestOpts.headers['Authorization']= `Bearer ${config.token}`;
				}
	},
	/* If resource requires upload stream, provide valid header */
	(requestOpts, {requiresReadableStream}, userOpts) => {
				if(requiresReadableStream) {
					requestOpts.headers['Content-Type']= 'application/octet-stream';
				}
	},
	/* Sets request parameter as request body (for RPC requests) or as header (for DOWNLOAD / UPLOAD requests) */
	(requestOpts, resourceDescription, userOpts, config) => {
		const resourceCategory = resourceDescription.category;
		const userParameters = userOpts.parameters;

		if (resourceCategory === RPC_RESOURCE_CATEGORY) {
			//RPC, put it as body
			requestOpts.body = resourceDescription.parameters.available ? userParameters : null;
		}else {
			//if not RPC, then we have 2 options: download or uplad type request
			requestOpts.headers[DB_HEADER_API_ARGS] = isObject(userParameters) ? http_header_safe_json(userParameters): '';
		}
	}
];

const resourcesDescriptionList = loadResourcesDescriptionList();

//------------------------------------------------------------------------------------

function generateResourcesHandlingFunctions(resourcesDescriptionList, config){
	const resourcesHandlingFunctions = {};
	Object.keys(resourcesDescriptionList).forEach((resourceName) => {
			const resourceDescription = resourcesDescriptionList[resourceName];
			const resourceCategory = resourceDescription.category;

			resourcesHandlingFunctions[resourceName] = function(userOpts, userCb) {
				//create default request object
				const requestOpts = createDefaultRequestOptObject(resourceDescription);

				//prepare requestOpts based on userOpts, config, etc.
				updateRequestOptsFnList.forEach(
					(updateRequestOptsFn) => updateRequestOptsFn(requestOpts, resourceDescription, userOpts, config)
				);

				const callback = prepareCallback(userCb);

				//send request
				if (resourceCategory === UPLOAD_RESOURCE_CATEGORY) {
					//it's upload type request, so pipe
					if(userOpts.readStream){
						// read stream specified, so pipe it
						return userOpts.readStream.pipe(request(requestOpts, callback));
					}else {
						// readStream not specified, so return writable stream
						return request(requestOpts, callback);
					}
				}else if(resourceCategory === DOWNLOAD_RESOURCE_CATEGORY) {
					return request(requestOpts, callback).pipe(createTransformStream());
				}else {
					//ordinary api call request
					return request(requestOpts, callback);
				}

				function prepareCallback(userCb) {
					return (err, response, body) => {
						if (err) {
							return userCb(err, null, response);
						}

						const responseContentType = response.headers['content-type'];
						const statusCode = response.statusCode;

						const handleResponseByContentType = {
							/* it's content-stream response type, so response object is located inside header */
							'application/octet-stream': () => {
								const dropboxApiResultContent = response.headers[DB_API_RESULT_HEADER_NAME];
								return dropboxApiResultContent && userCb(null, JSON.parse(dropboxApiResultContent), response);
							},
							/* it's ordinary RPC response, so result object is located inside body */
							'application/json': () => {
								const json = body;
								if(statusCode === 200) {
									return userCb(null, json, response);
								}else {
									json.code = statusCode;
									return userCb(json, null, response);
								}
							},
							/* text type response */
							'text/plain; charset=utf-8': () => {
								const text = body;
								if(statusCode === 200) {
									return userCb(null, text, response);
								}else{
									return userCb({
										code: statusCode,
										text: text
									}, null, response);
								}
							}
						};

						const responseHandlerFn = handleResponseByContentType[responseContentType];
						if (responseHandlerFn) {
							responseHandlerFn();
						}else {
							userCb(err || {});
						}
				}
			}
			};
	});
	return resourcesHandlingFunctions;
}

module.exports = {
	authenticate: function (config) {
		const resourceHandlingFunctions = generateResourcesHandlingFunctions(resourcesDescriptionList, config);
		const clientSession = function(userOpt, cb = noop) {
			const opt = {
				parameters: userOpt.parameters || {},
				resource: userOpt.resource || '',
				readStream: userOpt.readStream
			};
			const resourceName = opt.resource;
			if(resourceHandlingFunctions[resourceName]){
				return resourceHandlingFunctions[resourceName](opt, cb);
			}else{
				throwError(`resource "${opt.resource}" is invalid.`);
			}
		};
		Object.assign(clientSession, {
				generateAuthUrl: (input) => {
					return `${OAUTH2_AUTHORIZE}?client_id=${config.client_id}&response_type=code&redirect_uri=${config.redirect_uri}`;
				},
				getToken: (code, userCb) => {
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
					}, (err, resp, body) => {
						if(err || body.error) {
							userCb(body.error || {});
						}
						config.token = body.access_token;
						userCb(false, body);
					});
				}
		});
		return clientSession;
	}
}

function throwError(content) {
	throw content;
}

function createTransformStream() {
	const streamInstance = new stream.Transform();
	streamInstance._transform = function (chunk, enc, done) {
		this.push(chunk);
		done();
	};
	return streamInstance;
}

function noop() {}

function loadResourcesDescriptionList() {
	return JSON.parse(fs.readFileSync(RESOURCES_DESCRIPTION_PATH));
}

function createDefaultRequestOptObject(resourceDescription){
	return {
		method: 'POST',
		uri: resourceDescription.uri,
		json: true,
		followRedirect: false,
		headers: {}
	}
}

function isObject (obj) {
	return (typeof obj) === 'object' && !!obj;
}
