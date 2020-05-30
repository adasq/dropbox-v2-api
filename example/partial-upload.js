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

const CHUNK_LENGTH = 41;

const FILE_PATH = path.join(__dirname, 'test-file');
const FILE_SIZE = fs.statSync(FILE_PATH).size;

const getNextChunkStream = (start, end) => fs.createReadStream(FILE_PATH, { start, end });

const append = (sessionId, start, end) => {
    if (start === FILE_SIZE) { // this means we have entire file uploaded, so commit
        return sessionFinish(sessionId);
    }

    if (end > FILE_SIZE) { // this last chunk might be smaller
        end = FILE_SIZE - 1;
        console.log(`uploading ${end - start + 1} bytes (from ${start} to ${end}) (last smaller chunk)`);
        return sessionAppend(sessionId, start, FILE_SIZE - 1, () => {
            return sessionFinish(sessionId, FILE_SIZE);
        })
    }
    console.log(`uploading ${end - start + 1} bytes (from ${start} to ${end})`);
    sessionAppend(sessionId, start, end, () => {
        append(sessionId, end + 1, end + CHUNK_LENGTH)
    });
}

sessionStart((sessionId) => {
    append(sessionId, 0, CHUNK_LENGTH - 1) // first chunk
});

function sessionStart(cb) {
    dropbox({
        resource: 'files/upload_session/start',
        parameters: {
            close: false
        },
    }, (err, result, response) => {
        if (err) { return console.log('sessionStart error: ', err) }
        console.log('sessionStart result:', result);
        cb(result.session_id);
    });
}

function sessionAppend(sessionId, start, end, cb) {
    dropbox({
        resource: 'files/upload_session/append',
        parameters: {
            cursor: {
                session_id: sessionId,
                offset: start
            },
            close: false,
        },
        readStream: getNextChunkStream(start, end)
    }, (err, result, response) => {
        if (err) { return console.log('sessionAppend error: ', err) }
        cb();
    });
}

function sessionFinish(sessionId) {
    dropbox({
        resource: 'files/upload_session/finish',
        parameters: {
            cursor: {
                session_id: sessionId,
                offset: FILE_SIZE
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