import config from 'nconf';

config.env().file({ file: './config.json' });
config.required(['DROPBOX_TOKEN']);

export default config;