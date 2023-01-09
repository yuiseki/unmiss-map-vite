import { load } from 'js-yaml'
import { readFileSync } from 'fs'

const config = load(readFileSync('scripts/layers.yml', 'utf8'))

console.log(config);
