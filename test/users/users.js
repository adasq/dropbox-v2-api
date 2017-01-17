const should = require('should');
const dropbox = require('../../src/dropbox-api-test.js');

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
    describe('users', () => {
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
});