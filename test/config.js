const config = require('nconf');
config.env().file({ file: './config.json' });
config.required(['DROPBOX_TOKEN']);

module.exports = config;