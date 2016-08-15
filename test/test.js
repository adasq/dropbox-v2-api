var assert = require('assert');
var should = require('should');
var dropbox = require('../dropbox-api.js');
var fs = require('fs');
var path = require('path');
var spec = require('stream-spec');
var tester = require('stream-tester');

var credentials = JSON.parse(fs.readFileSync(path.join('example/credentials.json')));



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
	xdescribe('users', function () {
		it('get_account', function (done) {
			dropbox({
				resource: 'users/get_account',
				parameters: {
					account_id: 'dbid:AAD6ohziJisQr3HsC9gQc4R-wW4d8Xe_Qic'
				}
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('account_id');
				done();
				console.log(response);
			});
	    });
	    it('get_current_account', function (done) {
			dropbox({
				resource: 'users/get_current_account'
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('account_id');
				done();
				console.log(response);
			});
	    });

	    it('get_space_usage', function (done) {
			dropbox({
				resource: 'users/get_space_usage'
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('used');
				done();
				console.log(response);
			});
	    });
	    it('get_account_batch', function (done) {
			dropbox({
				resource: 'users/get_account_batch',
				parameters: {
					account_ids: ['dbid:AAD6ohziJisQr3HsC9gQc4R-wW4d8Xe_Qic']
				}
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.be.an.Array();
				done();
				console.log(response);
			});
	    });
	});

	describe('files', function(){

		var dirName = ['dir', +new Date()].join('-');

		it('create_folder', function(done){
			dropbox({
				resource: 'files/create_folder',
				parameters: {
					path: ['/', dirName].join('')
				}
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('name', dirName);
				done();
			});			
		});
		it('alpha/get_metadata', function(done){
			dropbox({
				resource: 'files/alpha/get_metadata',
				parameters: {
				    path: "/test/exampleFile.txt",
				    include_media_info: false,
				    include_deleted: false,
				    include_has_explicit_shared_members: false
				}
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('size', 11);
				done();
			});			
		});		
		it('alpha/upload', function(done){
			function getReadStream(){
				var item = 0;
				return tester.createRandomStream(function () {
					return ['item', (++item)].join('');
				}, 20);
			}
			var filePath = ['/', dirName, '/alpha-upload.txt'].join('');
			dropbox({
				resource: 'files/alpha/upload',
				parameters: {
					path: filePath
				},
				readStream: getReadStream()
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('path_lower', filePath);
				done();
			});			
		});
		it('upload', function(done){	
			function getReadStream(){
				var item = 0;
				return tester.createRandomStream(function () {
					return ['item', (++item)].join('');
				}, 20);
			}
			var filePath = ['/', dirName, '/upload.txt'].join('');
			dropbox({
				resource: 'files/upload',
				parameters: {
					path: filePath
				},
				readStream: getReadStream()
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('path_lower', filePath);
				done();
			});			
		});
		it('copy', function(done){
			var targetFileName = ['/', dirName ,'/example-file.txt'].join('');
			dropbox({
				resource: 'files/copy',
				parameters: {
				    'from_path': '/test/exampleFile.txt',
				    'to_path': targetFileName
				}				
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('path_lower', targetFileName);
				done();
			});
		});	
		it('download', function(done){
			var filePath = ['/', dirName, '/upload.txt'].join('');
			var dropboxStream = dropbox({
				resource: 'files/download',
				parameters: {
					path: filePath
				}				
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('path_lower', filePath);
				done();
			});
			dropboxStream.pipe(fs.createWriteStream('sssss'));	
		});		
	});
});