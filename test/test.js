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
	xdescribe('user', function () {
	    it('get_current_account', function (done) {
			dropbox({
				resource: 'users/get_current_account'
			}, function callback(err, response){
				if(err){ throw err; }			
				response.should.have.property('account_id');
				done();
			});
	    });
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
			});
	    });
	    it('get_space_usage', function (done) {
			dropbox({
				resource: 'users/get_space_usage'
			}, function callback(err, response){
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
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.be.an.Array();
				done();
			});
	    });
	});
	describe('files', function(){

		// after(function(done) {
		// 	dropbox({
		// 		resource: 'files/delete',
		// 		parameters: {
		// 			path: '/test-dir'
		// 		}
		// 	}, function callback(err, response){
		// 		if(err){ throw err; }
		// 		response.should.have.property('name', 'test-dir');
		// 		done();
		// 	});				
		// });
		xit('create_folder', function(done){
			dropbox({
				resource: 'files/create_folder',
				parameters: {
					path: '/test-dir'
				}
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('name', 'test-dir');
				done();
			});			
		});
		xit('upload', function(done){			
			function getReadStream(){
				var line = 0;
				return tester.createRandomStream(function () {
					return 'line ' + (++line) + '\r\n'
				}, 20);
			}
			dropbox({
				resource: 'files/upload',
				parameters: {
					path: '/test-dir/test.txt'
				},
				readStream: getReadStream()
			}, function callback(err, response){
				if(err){ throw err; }
				response.should.have.property('path_lower', '/test-dir/test.txt');
				done();
			});			
		});
		it('download', function(done){
			var dropboxStream = dropbox({
				resource: 'files/download',
				parameters: {
					path: '/test-dir/test.txt'
				}				
			}, function callback(err, response){
				if(err){ throw err; }
				console.log('dl',response);
				done();
			});
			dropboxStream.pipe(fs.createWriteStream('sssss'));	
		});		
	});
});