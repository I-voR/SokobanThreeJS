//import * as mapData from '../data/maps.json'
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function globalSetter() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    global.GLOBALlobby = [];
    global.GLOBALmaps = JSON.parse(readFileSync(__dirname + '/../data/maps.json'));
    global.GLOBALdata = null
}
export default globalSetter




