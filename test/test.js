var assert = require('assert');
var should = require('should');
var dropbox = require('../dropbox-api.js');
var fs = require('fs');
var path = require('path');

var credentials = JSON.parse(fs.readFileSync(path.join('example/credentials.json')));




describe('Namespace', function() {
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
		it('x', function(){
			[].should.be.an.Array();
		})
	});
});