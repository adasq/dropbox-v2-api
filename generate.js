// require('./src/generate-api-description.js')();
const {decompress} = require("compress-json");
const apiJSON = require('./src/api.json');
console.log(decompress(apiJSON));
