const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

var parsedApiDescription = JSON.parse(fs.readFileSync(path.join(__dirname, '../dist/api.json')));
const options = {};

const API_NAME = 'files/copy_batch';
const api = parsedApiDescription[API_NAME];
console.log(api);

api.parameters.forEach(parameter => {
    if(parameter.type.startsWith('String')){
        parameter.example = `'${parameter.example}'`;
    }
});

var template = ejs.compile(`
    dropbox({
        resource: '${API_NAME}',
        parameters: {
        <% for(var i=0; i<parameters.length; i++) {%>   <%= parameters[i].name %>: <%- parameters[i].example %><%= (parameters.length -1 !== i) ? ',': '' %>
        <% } %>}
    }, (err, result) => {
        if(err){ return console.log('err:', err); }
        console.log(result);
    });
`, options);

const output = template(api);

console.log('========================');
console.log(output);


