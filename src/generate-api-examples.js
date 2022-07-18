const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const beautify = require('js-beautify').js_beautify;

var parsedApiDescription = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/api.json')));
const options = {};

const apiNameList = Object.keys(parsedApiDescription);

const mdContent = apiNameList.map(apiName => {
    console.log(apiName)
    console.log(parsedApiDescription[apiName])

    parsedApiDescription[apiName].request = parsedApiDescription[apiName].request || { example: [{}] }

    const example = prepareExampleByApiDescription(parsedApiDescription[apiName], apiName);
return `
### ${example.name} ([see docs](${example.docs}))
${example.description}

\`\`\`js
${example.code}
\`\`\`
`;
});


fs.writeFileSync('EXAMPLES.md', mdContent.join('\n'));


function prepareExampleByApiDescription(apiDescription, apiName){

    function prepareUrl() {
        const sufix = apiName.replace(/\//g, '-');
        return `https://www.dropbox.com/developers/documentation/http/documentation#${sufix}`;
    }

    const templates = {
    'rpc': `
dropbox({
resource: '${apiName}'<% if(request.example[0].value) { %>,
parameters: <%- JSON.stringify(request.example[0].value, null, '') %> <% } %>}, (err, result, response) => {
    //see docs for \`result\` parameters
});
    `,
    'upload': `
        const stream = dropbox({
            resource: '${apiName}',
            parameters: <%- JSON.stringify(request.example[0].value, null, '') %>}, (err, result, response) => {
            //see docs for \`result\` parameters
        });

        fs.createReadStream(<%- request.example[0].value.path ? '\\''+request.example[0].value.path+'\\'': '' %>).pipe(stream);
    `,
    'download': `
        const stream = dropbox({
            resource: '${apiName}',
            parameters: <%- JSON.stringify(request.example[0].value, null, '') %>}, (err, result, response) => {
            //see docs for \`result\` parameters
        });

        stream
            .pipe(fs.createWriteStream(<%- request.example[0].value.path ? '\\''+request.example[0].value.path+'\\'': '' %>)); //pipe the stream
    `    
    }

    const template = ejs.compile(templates[apiDescription.format], options);
    const code = beautify(template(apiDescription), { indent_size: 4 }).replace(/\"/g, '\'');

    return {
        docs: prepareUrl(),
        name: apiName,
        description: apiDescription.description,
        code
    };

}





