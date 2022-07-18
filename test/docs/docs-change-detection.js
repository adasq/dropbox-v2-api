const should = require('should');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');
const request = require('request');
const expect = require('expect.js');
const generate = require('../../src/generate-api-description.js');

const API_DESC_FILE_PATH = path.join(__dirname, '../../dist/api.json');

describe('Docs change detection', function() {
    this.timeout(16000);
    describe('', () => {
        afterEach(function(done) {
            if(this.currentTest.state === 'failed'){
               notifyGithub(done);
            } else {
                done();
            }
        })
        it('contains equal content', function (done) {
            const currentDocsDescription = normalizeString(fs.readFileSync(API_DESC_FILE_PATH).toString());
            generate((err, retrievedDocsDescription) => {
                expect(err).to.be(null);

                retrievedDocsDescription = normalizeString(JSON.stringify(retrievedDocsDescription, null, '\t'));
                expect(md5(retrievedDocsDescription)).to.be(md5(currentDocsDescription));
                done();
            });
        });
        function normalizeString(str) {
            return str.replace(/\s+/g, '');
        }
    });
});

function notifyGithub(done) {
    const authorization = `Basic ${Buffer.from(`adasq:${process.env.TOKEN}`).toString('base64')}`
    request.post({
        url: 'https://api.github.com/repos/adasq/dropbox-v2-api/dispatches',
        body: { event_type : 'html.preview' },
        json: true,
        headers: {
            'User-Agent': 'curl/7.54.0',
            Authorization: authorization,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.everest-preview+json'
        }
    }, (err, resp, body) => {
        console.log(err);
        console.log(resp.statusCode);
        console.log(body);
        done()
    })
}