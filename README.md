# dropbox-api
Dropbox API v2 wrapper for nodejs.

The `dropbox-api` module is generated dynamically - it's based on  [Dropbox API description JSON file][api.json] which is an representation of Dropbox API v2 HTTP methods description, retrived from [official documentaion webpage][docs].

[api.json]: <https://github.com/adasq/dropbox-api/blob/master/dist/api.json>

## Get started

```js
var dropbox = require('dropbox-api');
```

## Auth


- using token
```js
dropbox.authenticate({
	token: 'your token'
});
```
- using oauth2 flow (see [example app][example-auth-flow])
```js
//set credentials
var oauth = dropbox.authenticate({
	client_id: 'APP_KEY',
	client_secret: 'APP_SECRET',
	redirect_uri: 'REDIRECT_URI'
});
//generate and visit authorization sevice 
var authUrl = oauth.generateAuthUrl();
//after redirection, you should receive code
oauth.getToken(code, function(err, response){
  //you are authorized now!
});
```

## Full API showcase

```js
dropbox({
    resource: (string),
    parameters: (object?),
    readStream: (readable stream object?)
}, function(err, result){
    if(err){ return console.log('err:', err); }
    console.log(result);
});

```
- `resource` (string) represent API target. It contains Dropbox's namespace and method name. eg. `'users/get_account'`, `'users/get_space_usage'`, `'files/upload'`, `'files/list_folder/longpoll'`, `'sharing/share_folder'` [more at official documentation][docs]
- `parameters` (object?) optional parameters, depends on `resource` field
- `readStream` (readable stream?) Upload-type requests should contains `readStream` field, which is readable stream

## API call examples

#### get_current_account [see docs][get_current_account]

```js
dropbox({
	resource: 'users/get_current_account'
}, function callback(err, response){
	if(err){ return console.log('err:', err); }
	console.log(response);
});
```

#### upload [see docs][files-upload]

Upload-type requests should contains `readStream` field, which is readable stream
```js
dropbox({
	resource: 'files/upload',
	parameters: {
		path: '/dropbox/path/to/file.js'
	},
	readStream: fs.createReadStream('path/to/file.js')
}, function(err, result){
	if(err){ return console.log('err:', err); }
	console.log(result);
});
```

#### download [see docs][files-download]

Download-type requests return `writableStream`
```js
dropbox({
	resource: 'files/download',
	parameters: {
		path: '/dropbox/image.jpg'
	}
}, function(err, result){
	if(err){ return console.log('err:', err); }
	console.log(result);
}).pipe( fs.createWriteStream('./image.jpg') );
```



#### get_metadata [see docs][get_metadata]

```js
dropbox({
	resource: 'files/get_metadata',
	parameters: {
		path: '/dropbox/path/to/file.js',
		include_media_info: false
	}
}, function(err, result){
	if(err){ return console.log('err:', err); }
	console.log(result);
});
```

[files-upload]: 
<https://www.dropbox.com/developers/documentation/http/documentation#files-upload>
[files-download]: 
<https://www.dropbox.com/developers/documentation/http/documentation#files-download>
[get_current_account]: <https://www.dropbox.com/developers/documentation/http/documentation#users-get_current_account>
[get_metadata]:
<https://www.dropbox.com/developers/documentation/http/documentation#files-get_metadata>
[docs]:<https://www.dropbox.com/developers/documentation/http/documentation>
[example-auth-flow]:<https://github.com/adasq/dropbox-api/blob/master/example/oauth2-flow.js>
