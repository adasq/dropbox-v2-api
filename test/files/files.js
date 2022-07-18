const should = require('should');
const spec = require('stream-spec');

const dropboxV2Api = require('../../src/dropbox-api-test.js');
const utils = require('../../src/utils.js');
const config = require('./../config.js');

let dropbox;

const sleep = async ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

describe('Namespace', function() {
    this.timeout(6000);
    before(function() {
        dropbox = dropboxV2Api.authenticate({
            token: config.get('DROPBOX_TOKEN')
        });
    });
    beforeEach(async function(){
        console.log('-------------------------');
    });
    describe('files', () => {
        const timestamp = (+new Date());
        var dirName = `dropbox-api-test-${timestamp}`;
        var dirPath = `/${dirName}`

        it('create_folder', (done) => {
            dropbox({
                resource: 'files/create_folder',
                parameters: {
                    path: dirPath
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('name', dirName);
                done();
            });
        });
        it('get_metadata', (done) => {
            dropbox({
                resource: 'files/get_metadata',
                parameters: {
                    path: dirPath,
                    include_media_info: false,
                    include_deleted: false,
                    include_has_explicit_shared_members: false
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('.tag', 'folder');
                result.should.have.property('path_lower', dirPath);

                done();
            });
        });
        it('upload', (done) => {
            var filePath = `${dirPath}/alpha-üpload.txt`;
            dropbox({
                resource: 'files/upload',
                parameters: {
                    path: filePath
                },
                readStream: utils.createMockedReadStream('1', 50)
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('path_lower', filePath);
                done();
            });
        });
        it('upload', (done) => {
            var filePath = `${dirPath}/upload.txt`;
            dropbox({
                resource: 'files/upload',
                parameters: {
                    path: filePath
                },
                readStream: utils.createMockedReadStream('2', 30)
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('path_lower', filePath);
                done();
            });
        });
        it('list_folder', (done) => {
            dropbox({
                resource: 'files/list_folder',
                parameters: {
                    path: dirPath,
                        "include_media_info": true,
                        "include_has_explicit_shared_members": true,
                        "include_non_downloadable_files": true
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.entries[0].should.have.property('size', 50);
                result.entries[1].should.have.property('size', 30);
                done();
            });
        });
        it('download', (done) => {
            var filePath = `${dirPath}/upload.txt`;
            var dropboxStream = dropbox({
                resource: 'files/download',
                parameters: {
                    path: filePath
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('path_lower', filePath);
                done();
            });
        });
        it('download -> upload combination', (done) => {
            var downloadFilePath = `${dirPath}/upload.txt`;
            var uploadFilePath = `${dirPath}/upload-2.txt`;

            const dlStream = dropbox({
                resource: 'files/download',
                parameters: {
                    path: downloadFilePath
                }
            });

            const uploadSteram = dropbox({
                resource: 'files/upload',
                parameters: {
                    path: uploadFilePath
                }
            }, (err, result) => {
                result.should.have.property('size', 30);
                done();
            });

            dlStream.pipe(uploadSteram);
        });
        it('copy', (done) => {
            const sourceFileName = `${dirPath}/upload-2.txt`;
            const targetFileName = `${dirPath}/upload-2-copied.txt`;
            dropbox({
                resource: 'files/copy',
                parameters: {
                    'from_path': sourceFileName,
                    'to_path': targetFileName
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('path_lower', targetFileName);
                done();
            });
        });
        it('delete', (done) => {
            var fileToDeleteName = `${dirPath}/upload-2-copied.txt`;
            dropbox({
                resource: 'files/delete',
                parameters: {
                    'path': fileToDeleteName
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('path_lower', fileToDeleteName);
                done();
            });
        });
        it('move', (done) => {
            var targetFileName = `${dirPath}/upload-moved.txt`;
            dropbox({
                resource: 'files/copy',
                parameters: {
                    'from_path': `${dirPath}/upload.txt`,
                    'to_path': targetFileName
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('path_lower', targetFileName);
                done();
            });
        });
    });
});