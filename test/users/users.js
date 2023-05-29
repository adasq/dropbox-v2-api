const should = require('should');
const dropboxV2Api = require('../../src/dropbox-api-test.js');
const config = require('./../config.js');

let dropbox, dropboxMalformed;


describe('Namespace', function() {
    this.timeout(6000);
    before(function() {
        dropbox = dropboxV2Api.authenticate({
            token: config.get('DROPBOX_TOKEN')
        });
        dropboxMalformed = dropboxV2Api.authenticate({
            token: config.get('DROPBOX_TOKEN') + '1'
        });
    });
    beforeEach(function(){
        console.log('-------------------------');
    });
    describe('users', () => {
        it('get_account fails', function (done) {
            dropboxMalformed({
                resource: 'users/get_account',
                parameters: {
                    account_id: 'dbid:AAA-vESAc6wjBUxydOH4U-J9hM5SNoQVMNk'
                }
            }, (err) => {
                err.error['.tag'].should.match(/invalid_access_token/);
                done();
            });
        });
        it('get_account', function (done) {
            dropbox({
                resource: 'users/get_account',
                parameters: {
                    account_id: 'dbid:AAA-vESAc6wjBUxydOH4U-J9hM5SNoQVMNk'
                }
            }, (err, result, response) => {
                if(err){ throw err; }
                result.should.have.property('account_id');
                response.headers.should.have.property('content-type', 'application/json');
                done();
            });
        });
        it('get_current_account', function (done) {
            dropbox({
                resource: 'users/get_current_account'
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('account_id');
                done();
            });
        });

        it('get_space_usage', function (done) {
            dropbox({
                resource: 'users/get_space_usage'
            }, (err, result) => {
                if(err){ throw err; }
                result.should.have.property('used');
                done();
            });
        });
        it('get_account_batch', function (done) {
            dropbox({
                resource: 'users/get_account_batch',
                parameters: {
                    account_ids: ['dbid:AAA-vESAc6wjBUxydOH4U-J9hM5SNoQVMNk']
                }
            }, (err, result) => {
                if(err){ throw err; }
                result.should.be.an.Array();
                done();
            });
        });
    });
});