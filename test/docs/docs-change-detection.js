const should = require('should');
const fs = require('fs');
const md5 = require('md5');
const path = require('path');
const expect = require('expect.js');
const generate = require('../../src/generate-api-description.js');

const API_DESC_FILE_PATH = path.join(__dirname, '../../dist/api-examples.json');

describe('Docs change detection', function() {
    this.timeout(16000);
    describe('', () => {
        it('contains equal content', function (done) {
            const currentDocsDescription = normalizeString(fs.readFileSync(API_DESC_FILE_PATH).toString());
            generate((err, retrievedDocsDescription) => {
                expect(err).to.be(null);
                retrievedDocsDescription = normalizeString(retrievedDocsDescription);
                expect(md5(retrievedDocsDescription)).to.be(md5(currentDocsDescription));
                done();
            });
        });
        function normalizeString(str) {
            return str.replace(/\s+/g, '');
        }
    });
});