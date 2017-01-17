# dropbox-v2-api
Dropbox API v2 wrapper for nodejs.

The `dropbox-v2-api` module is generated dynamically - it's based on  [Dropbox API description JSON file][api.json] which is an representation of Dropbox API v2 HTTP methods description, retrived from [official documentaion webpage][docs].

[api.json]: <https://github.com/adasq/dropbox-v2-api/blob/master/dist/api.json>

## Get started

```js
const dropbox = require('dropbox-v2-api');
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
const oauth = dropbox.authenticate({
	client_id: 'APP_KEY',
	client_secret: 'APP_SECRET',
	redirect_uri: 'REDIRECT_URI'
});
//generate and visit authorization sevice 
const authUrl = oauth.generateAuthUrl();
//after redirection, you should receive code
oauth.getToken(code, (err, response) => {
	//you are authorized now!
});
```

## Full API showcase

```js
dropbox({
    resource: (string),
    parameters: (object?),
    readStream: (readable stream object?)
}, (err, result) => {
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
}, (err, response) => {
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
}, (err, result) => {
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
}, (err, result) => {
	if(err){ return console.log('err:', err); }
	console.log(result);
}).pipe( fs.createWriteStream('./image.jpg') );
```

#### download & upload

You can easely use streams: 
```js
const downloadStream = dropbox({
	resource: 'files/download',
	parameters: { path: '/source/file/path' }				
});

const uploadStream = dropbox({
	resource: 'files/upload',
	parameters: { path: '/target/file/path' }				
}, (err, response) => {
	!err && console.log('file succesfully uploaded!');
});

downloadStream.pipe(uploadStream);
// fs.createReadStream('/file/path').pipe(uploadStream);
// downloadStream.pipe(fs.createWriteStream('/file/path'));
```




#### get_metadata [see docs][get_metadata]

```js
dropbox({
	resource: 'files/get_metadata',
	parameters: {
		path: '/dropbox/path/to/file.js',
		include_media_info: false
	}
}, function(err, result) => {
	if(err){ return console.log('err:', err); }
	console.log(result);
});
```

#### upload_session [see docs][session-upload]

```js
const CHUNK_LENGTH = 100;
//create read streams, which generates set of 100 (CHUNK_LENGTH) characters of values: 1 and 2
const firstUploadChunkStream = () => utils.createMockedReadStream('1', CHUNK_LENGTH); 
const secondUploadChunkStream = () => utils.createMockedReadStream('2', CHUNK_LENGTH);

sessionStart((sessionId) => {
	sessionAppend(sessionId, () => {
		sessionFinish(sessionId);
	});
});

function sessionStart(cb) {
    dropbox({
        resource: 'files/upload_session/start',
        parameters: {
            close: false
        },
        readStream: firstUploadChunkStream()
    }, (err, response) => {
		if(err){ return console.log('sessionStart error: ', err) }
		console.log('sessionStart response:', response);
		cb(response.session_id);
	});
}


function sessionAppend(sessionId, cb) {
    dropbox({
        resource: 'files/upload_session/append_v2',
        parameters: {
            cursor: {
                session_id: sessionId,
                offset: CHUNK_LENGTH
            },
            close: false,
        },
        readStream: secondUploadChunkStream()
    }, (err, response) => {
		if(err){ return console.log('sessionAppend error: ', err) }
		console.log('sessionAppend response:', response);
		cb();
	});
}

function sessionFinish(sessionId) {
    dropbox({
        resource: 'files/upload_session/finish',
        parameters: {
            cursor: {
                session_id: sessionId,
                offset: CHUNK_LENGTH * 2
            },
            commit: {
                path: "/result.txt",
                mode: "add",
                autorename: true,
                mute: false
            }
        }
    }, (err, response) => {
		if(err){ return console.log('sessionFinish error: ', err) }
		console.log('sessionFinish response:', response);
	});
}
```


#### check [test cases][tests] for more examples...

[tests]: <https://github.com/adasq/dropbox-v2-api/blob/master/test>
[session-upload]: 
<https://www.dropbox.com/developers/documentation/http/documentation#files-upload_session-start>
[files-upload]: 
<https://www.dropbox.com/developers/documentation/http/documentation#files-upload>
[files-download]: 
<https://www.dropbox.com/developers/documentation/http/documentation#files-download>
[get_current_account]: <https://www.dropbox.com/developers/documentation/http/documentation#users-get_current_account>
[get_metadata]:
<https://www.dropbox.com/developers/documentation/http/documentation#files-get_metadata>
[docs]:<https://www.dropbox.com/developers/documentation/http/documentation>
[example-auth-flow]:<https://github.com/adasq/dropbox-v2-api/blob/master/example/oauth2-flow.js>
