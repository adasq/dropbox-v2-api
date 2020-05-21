/**
 * To run example you have to create 'credentials.json' file
 * in current location.
 * 
 * File should contain JSON object, with 'TOKEN' property.
 */

const dropboxV2Api = require('../src/dropbox-api.js');

const fs = require('fs');
const path = require('path');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

//set token authentication:
const dropbox = dropboxV2Api.authenticate({
    token: credentials.TOKEN
});

const CHUNK_LENGTH = 100;

const FILE_PATH = path.join(__dirname, 'test-file');

const firstUploadChunkStream = () => fs.createReadStream(FILE_PATH, { start: 0, end: CHUNK_LENGTH - 1  }); // first 100 bytes (0 - 99)
const secondUploadChunkStream = () => fs.createReadStream(FILE_PATH, { start: CHUNK_LENGTH, end: 2 * CHUNK_LENGTH - 1 }); //second 100 bytes (100 - 200)

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