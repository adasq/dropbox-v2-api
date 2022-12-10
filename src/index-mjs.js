import { readFile } from 'fs/promises';
import init from './dropbox-api.js'

const apiJSON = JSON.parse(
  await readFile(
    new URL('./api.json', import.meta.url)
  )
);

export default init(apiJSON)

