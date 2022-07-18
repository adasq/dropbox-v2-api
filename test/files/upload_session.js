const should = require('should');
const expect = require('expect.js');

const dropboxV2Api = require('../../src/dropbox-api-test.js');
const utils = require('../../src/utils.js');
const config = require('./../config.js');

const CHUNK_LENGTH = 100;
const firstUploadChunkStream = () => utils.createMockedReadStream('1', CHUNK_LENGTH);
const secondUploadChunkStream = () => utils.createMockedReadStream('2', CHUNK_LENGTH);

let dropbox;

describe('Namespace ', function() {
    this.timeout(10 * 000);
    before(function() {
        dropbox = dropboxV2Api.authenticate({
            token: config.get('DROPBOX_TOKEN')
        });
    });
    describe('files/upload_session', () => {
        it('upload_session', function (done) {
            sessionStart((sessionId) => {
                sessionAppend(sessionId, () => {
                    sessionFinish(sessionId, () => {
                        done();
                    });
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
                expect(response).to.have.key('session_id');
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
                should(response).be.exactly(null)
                cb();
            });
        }

        function sessionFinish(sessionId, cb) {
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
                expect(response.size).to.be(CHUNK_LENGTH * 2);
                cb();
            });
        }

        });
    });
});

