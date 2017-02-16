const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const beautify = require('js-beautify').js_beautify;

var parsedApiDescription = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/api.json')));
const options = {};

const API_NAME = 'files/copy_reference/save';
const api = parsedApiDescription[API_NAME];

const sufix = API_NAME.replace(/\//g, '-');
const URL = `https://www.dropbox.com/developers/documentation/http/documentation#${sufix}`;

console.log(URL);
console.log(api);

const templates = {
'rpc': `
    dropbox({
        resource: '${API_NAME}',
        parameters: <%- JSON.stringify(parameters.example, null, '    ') %>
    }, (err, result) => {
        if(err){ return console.log('err:', err); }
        console.log(result);
    });
`,
'content-upload': `
    const uploadStream = dropbox({
        resource: '${API_NAME}',
        parameters: <%- JSON.stringify(parameters.example, null, '    ') %>
    }, (err, result) => {
        if(err){ return console.log('err:', err); }
        console.log(result);
    });

    fs.createReadStream('./example').pipe(uploadStream)
`
}

var template = ejs.compile(templates[api.endpointFormat], options);

const output = template(api);

console.log('========================');
console.log(beautify(output, { indent_size: 4 }).replace(/\"/g, '\''));


