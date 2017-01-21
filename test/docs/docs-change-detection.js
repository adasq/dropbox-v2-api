const should = require('should');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');
const expect = require('expect.js');
const generate = require('../../src/generate-api-description.js');

const DROPBOX_TOKEN = process.env.DROPBOX_TOKEN;

const API_DESC_FILE_PATH = path.join(__dirname, '../../dist/api.json');

describe('Docs change detection', function() {
    this.timeout(16000);
    describe('', () => {
        it('contains equal content', function (done) {
            const currentDocsDescription = fs.readFileSync(API_DESC_FILE_PATH);
            generate((err, retrivedDocsDescription) => {
                expect(err).to.be(null);
                expect(md5(retrivedDocsDescription)).to.be(md5(currentDocsDescription));
                done();
            });
        });
    });
});