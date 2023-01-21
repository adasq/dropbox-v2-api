import { readFileSync } from 'fs';
import { join } from 'path';
import init from './dropbox-api.js'

const apiDescription = JSON.parse(readFileSync(join(__dirname, 'api.json')).toString());

export const authenticate = init(apiDescription).authenticate;
