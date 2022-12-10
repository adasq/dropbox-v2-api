import should from 'should';
import fs from 'fs';
import md5 from 'md5';
import path from 'path';
import request from 'request';
import expect from 'expect.js';
import generate from '../../src/generate-api-description.js';
import { fileURLToPath } from 'url';
import {decompress} from "compress-json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_DESC_FILE_PATH = path.join(__dirname, '../../src/api.json');

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
            try {
                const currentDocsDescription = normalizeString(JSON.stringify(decompress(JSON.parse(fs.readFileSync(API_DESC_FILE_PATH).toString())), null, '\t'))
                generate((err, retrievedDocsDescription) => {
                    expect(err).to.be(null);

                    retrievedDocsDescription = normalizeString(JSON.stringify(retrievedDocsDescription, null, '\t'));
                    expect(md5(retrievedDocsDescription)).to.be(md5(currentDocsDescription));
                    done();
                });
            } catch(err) {
                console.log(err);
                throw err;
            }

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