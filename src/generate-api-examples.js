const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const beautify = require('js-beautify').js_beautify;

var parsedApiDescription = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/api-examples.json')));

function stringify(obj_from_json) {
    if(typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
        // not an object, stringify using native function
        return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    let props = Object
        .keys(obj_from_json)
        .map(key => `${key}:${stringify(obj_from_json[key])}`)
        .join(",");
    return `{${props}}`;
}


const options = { };

const apiNameList = Object.keys(parsedApiDescription);

const mdContent = apiNameList.map(apiName => {
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
    'RPC': `
dropbox({
resource: '${apiName}'<% if(parameters.example) { %>,
parameters: <%- stringify(parameters.example, null, '') %> <% } %>}, (err, result, response) => {
    //see docs for \`result\` parameters
});
    `,
    'UPLOAD': `
        const stream = dropbox({
            resource: '${apiName}',
            parameters: <%- stringify(parameters.example, null, '') %>}, (err, result, response) => {
            //see docs for \`result\` parameters
        });

        fs.createReadStream(<%- parameters.example.path ? '\\''+parameters.example.path+'\\'': '' %>).pipe(stream);
    `,
    'DOWNLOAD': `
        const stream = dropbox({
            resource: '${apiName}',
            parameters: <%- stringify(parameters.example, null, '') %>}, (err, result, response) => {
            //see docs for \`result\` parameters
        });

        stream
            .pipe(fs.createWriteStream(<%- parameters.example.path ? '\\''+parameters.example.path+'\\'': '' %>)); //pipe the stream
    `    
    }

    const template = ejs.compile(templates[apiDescription.category], options);
    const code = beautify(template({ ...apiDescription, stringify }), { indent_size: 4 }).replace(/\"/g, '\'');

    return {
        docs: prepareUrl(),
        name: apiName,
        description: apiDescription.description,
        code
    };

}





