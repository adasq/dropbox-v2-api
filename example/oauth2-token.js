const dropbox = require('../src/dropbox-api.js');
const utils = require('../src/utils.js');

const fs = require('fs');
const path = require('path');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//set token authentication:
dropbox.authenticate({
	token: credentials.TOKEN
});

function createReadStream(sign, length){
	return tester.createRandomStream(function () {
		return sign;
	}, length);
}

const CHUNK_LENGTH = 100;
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
