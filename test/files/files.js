const should = require('should');
const spec = require('stream-spec');

const dropbox = require('../../src/dropbox-api.js');
const utils = require('../../src/utils.js');

const DROPBOX_TOKEN = process.env.DROPBOX_TOKEN;

describe('Namespace', function() {
    this.timeout(6000);
    before(function() {
        dropbox.authenticate({
            token: DROPBOX_TOKEN
        });
    });
    beforeEach(function(){
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
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('name', dirName);
                done();
            });
        });
        it('alpha/get_metadata', (done) => {
            dropbox({
                resource: 'files/alpha/get_metadata',
                parameters: {
                    path: dirPath,
                    include_media_info: false,
                    include_deleted: false,
                    include_has_explicit_shared_members: false
                }
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('.tag', 'folder');
                response.should.have.property('path_lower', dirPath);

                done();
            });         
        });     
        it('alpha/upload', (done) => {
            var filePath = `${dirPath}/alpha-upload.txt`;
            dropbox({
                resource: 'files/alpha/upload',
                parameters: {
                    path: filePath
                },
                readStream: utils.createMockedReadStream('1', 50)
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('path_lower', filePath);
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
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('path_lower', filePath);
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
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('path_lower', filePath);
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
            }, (err, response) => {
                response.should.have.property('size', 30);
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
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('path_lower', targetFileName);
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
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('path_lower', fileToDeleteName);
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
            }, (err, response) => {
                if(err){ throw err; }
                response.should.have.property('path_lower', targetFileName);
                done();
            });
        }); 
    });
});