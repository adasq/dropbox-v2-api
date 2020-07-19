# dropbox-v2-api

[![Actions Status](https://github.com/adasq/dropbox-v2-api/workflows/Integration%20Tests/badge.svg)](https://github.com/adasq/dropbox-v2-api/actions)
[![NPM Downloads](https://img.shields.io/npm/dm/dropbox-v2-api.svg?style=flat)](https://www.npmjs.org/package/dropbox-v2-api)
[![NPM Downloads](https://img.shields.io/npm/dt/dropbox-v2-api.svg?style=flat)](https://www.npmjs.org/package/dropbox-v2-api)
[![npm version](https://badge.fury.io/js/dropbox-v2-api.svg)](https://badge.fury.io/js/dropbox-v2-api)

The API is generated programmatically, based on [endpoints description JSON][api.json] fetched from [official docs][docs].

[api.json]: <https://github.com/adasq/dropbox-v2-api/blob/master/dist/api.json>
## Why this package?

- Always **up-to-date API** (PRs with changes are generated automatically, [see most recent][change-detection-pr])
- Simple API (**no custom function names**, see [full API showcase](#full-api-showcase))
- Full support for **streams** (see [upload/download](#upload-and-download-examples) examples)
- Supports Dropbox **Paper API**
- **Examples** for all endpoints ([see more][examples])


## Get started
```js
$ npm i -s dropbox-v2-api
```

```js
const dropboxV2Api = require('dropbox-v2-api');
```

## Auth

- using token

```js
// create session ref:
const dropbox = dropboxV2Api.authenticate({
    token: 'your token'
});

// use session ref to call API, i.e.:
dropbox({
    resource: 'users/get_account',
    parameters: {
        'account_id': 'dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc'
    }
}, (err, result, response) => {
    if (err) { return console.log(err); }
    console.log(result);
});

```
- using oauth2 flow (see [example app][example-auth-flow])
```js
//set credentials
const dropbox = dropboxV2Api.authenticate({
    client_id: 'APP_KEY',
    client_secret: 'APP_SECRET',
    redirect_uri: 'REDIRECT_URI',
    state: 'OPTIONAL_STATE_VALUE'
});
//generate and visit authorization sevice
const authUrl = dropbox.generateAuthUrl();
//after redirection, you should receive code
dropbox.getToken(code, (err, result, response) => {
    //you are authorized now!
    //your optional state, given in authenticate: response.query.state
});
```

## Full API showcase

```js
dropbox({
    resource: (string),
    parameters: (object?),
    readStream: (readable stream object?)
}, (err, result, response) => {
    if (err) { return console.log('err:', err); }
    console.log(result);
    console.log(response.headers);
});

```
- `resource` (*string*) represent API target. It contains Dropbox's namespace and method name. eg. `'users/get_account'`, `'users/get_space_usage'`, `'files/upload'`, `'files/list_folder/longpoll'`, `'sharing/share_folder'` [more at official documentation][docs]
- `parameters` (*object?*) optional parameters, depends on `resource` field
- `readStream` (*readable stream?*) Upload-type requests might contains `readStream` field, which is readable stream

For Download-type requests, the function ```dropbox``` returns readable stream.

## Upload and Download examples

#### upload [see docs][files-upload]

Upload-type requests might contains `readStream` field, which is readable stream
```js
dropbox({
    resource: 'files/upload',
    parameters: {
        path: '/dropbox/path/to/file.js'
    },
    readStream: fs.createReadStream('path/to/file.js')
}, (err, result, response) => {
    //upload completed
});
```
or, using streams:

```js
const dropboxUploadStream = dropbox({
    resource: 'files/upload',
    parameters: {
        path: '/dropbox/path/to/file.js'
    }
}, (err, result, response) => {
    //upload completed
});

fs.createReadStream('path/to/file.js').pipe(dropboxUploadStream);
```

#### download [see docs][files-download]

Download-type requests return `writableStream`
```js
dropbox({
    resource: 'files/download',
    parameters: {
        path: '/dropbox/image.jpg'
    }
}, (err, result, response) => {
    //download completed
})
.pipe(fs.createWriteStream('./image.jpg'));
```

Problems with downloading? More [here](#downloading-issues)

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
}, (err, result, response) => {
    //upload finished
});

downloadStream.pipe(uploadStream);
```

## API call examples

#### get_current_account [see docs][get_current_account]

```js
dropbox({
    resource: 'users/get_current_account'
}, (err, result, response) => {
    if (err) { return console.log('err:', err); }
    console.log(result);
});
```

#### get_metadata [see docs][get_metadata]

```js
dropbox({
    resource: 'files/get_metadata',
    parameters: {
        path: '/dropbox/path/to/file.js',
        include_media_info: false
	}
}, (err, result, response) => {
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
    }, (err, result, response) => {
        if (err) { return console.log('sessionStart error: ', err) }
        console.log('sessionStart result:', result);
        cb(result.session_id);
    });
}


function sessionAppend(sessionId, cb) {
    dropbox({
        resource: 'files/upload_session/append',
        parameters: {
            cursor: {
                session_id: sessionId,
                offset: CHUNK_LENGTH
            },
            close: false,
        },
        readStream: secondUploadChunkStream()
    }, (err, result, response) => {
        if(err){ return console.log('sessionAppend error: ', err) }
        console.log('sessionAppend result:', result);
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
    }, (err, result, response) => {
        if (err) { return console.log('sessionFinish error: ', err) }
        console.log('sessionFinish result:', result);
    });
}
```

### Downloading issues

1. `FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory`

You can increase your default memory limit for an app:
`$ NODE_OPTIONS=--max_old_space_size= 4096 node app.js`
where `4096` stands for 4GB.

#### check [test cases][tests] or [examples][examples] for more examples...

[change-detection-pr]: <https://github.com/adasq/dropbox-v2-api/issues?utf8=%E2%9C%93&q=Dropbox+API+changes+detected+is%3Amerged+>
[examples]: <https://github.com/adasq/dropbox-v2-api/blob/master/EXAMPLES.md>
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
