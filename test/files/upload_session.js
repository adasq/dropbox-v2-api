import should from 'should';
import expect from 'expect.js';
import dropboxV2Api from '../../src/dropbox-api-test.js';
import utils from '../../src/utils.js';
import config from '../config.js';

const CHUNK_LENGTH = 100;
const firstUploadChunkStream = () => utils.createMockedReadStream('1', CHUNK_LENGTH);
const secondUploadChunkStream = () => utils.createMockedReadStream('2', CHUNK_LENGTH);

let dropbox;

describe('Namespace ', function() {
    this.timeout(10 * 1000);
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

