const assert = require('assert');
const should = require('should');
const dropbox = require('../dropbox-api.js');
const fs = require('fs');
const path = require('path');
const spec = require('stream-spec');
const tester = require('stream-tester');

const credentials = JSON.parse(fs.readFileSync(path.join('example/credentials.json')));

function getReadStream(){
	var item = 0;
	return tester.createRandomStream(function () {
		return ['item', (++item)].join('-');
	}, 20);
}

describe('Namespace', function() {
	this.timeout(6000);
	before(function() {
		dropbox.authenticate({
			token: credentials.TOKEN
		});
	});
	beforeEach(function(){
		console.log('-------------------------');
	});
	xdescribe('users', () => {
		it('get_account', function (done) {
			dropbox({
				resource: 'users/get_account',
				parameters: {
					account_id: 'dbid:AAD6ohziJisQr3HsC9gQc4R-wW4d8Xe_Qic'
				}
			}, (err, response) => {
				if(err){ throw err; }
				response.should.have.property('account_id');
				done();
			});
	    });
	    it('get_current_account', function (done) {
			dropbox({
				resource: 'users/get_current_account'
			}, (err, response) => {
				if(err){ throw err; }
				response.should.have.property('account_id');
				done();
			});
	    });

	    it('get_space_usage', function (done) {
			dropbox({
				resource: 'users/get_space_usage'
			}, (err, response) => {
				if(err){ throw err; }
				response.should.have.property('used');
				done();
			});
	    });
	    it('get_account_batch', function (done) {
			dropbox({
				resource: 'users/get_account_batch',
				parameters: {
					account_ids: ['dbid:AAD6ohziJisQr3HsC9gQc4R-wW4d8Xe_Qic']
				}
			}, (err, response) => {
				if(err){ throw err; }
				response.should.be.an.Array();
				done();
			});
	    });
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
				readStream: getReadStream()
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
				readStream: getReadStream()
			}, (err, response) => {
				if(err){ throw err; }
				response.should.have.property('path_lower', filePath);
				done();
			});			
		});
		it('copy', (done) => {
			var targetFileName = `${dirPath}/upload-copied.txt`;
			dropbox({
				resource: 'files/copy',
				parameters: {
				    'from_path': dirPath+'/upload.txt',
				    'to_path': targetFileName
				}				
			}, (err, response) => {
				if(err){ throw err; }
				response.should.have.property('path_lower', targetFileName);
				done();
			});
		});
		it('delete', (done) => {
			var fileToDeleteName = `${dirPath}/upload-copied.txt`;
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
			dropboxStream.pipe(fs.createWriteStream('sssss'));	
		});		
	});
});