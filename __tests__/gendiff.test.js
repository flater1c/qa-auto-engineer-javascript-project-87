import { fileURLToPath } from 'url';
import path from 'path';
import parseJSONFiles, { parseYMLFiles } from '../src/parse.js';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const parsedJsons = parseJSONFiles(getFixturePath('file1.json'), getFixturePath('file2.json'));
const parsedYamls = parseYMLFiles(getFixturePath('file1.yml'), getFixturePath('file2.yml'));

test('Checking flat jsons', () => {
  expect(gendiff(parsedJsons.output1, parsedJsons.output2)).toEqual('{\n'
        + ' - follow: false\n'
        + '   host: hexlet.io\n'
        + ' - proxy: 123.234.53.22\n'
        + ' - timeout: 50\n'
        + ' + timeout: 20\n'
        + ' + verbose: true\n'
        + '}');
});
test('Checking flat yamls', () => {
  expect(gendiff(parsedYamls.output1, parsedYamls.output2)).toEqual('{\n'
      + ' - follow: false\n'
      + '   host: hexlet.io\n'
      + ' - proxy: 123.234.53.22\n'
      + ' - timeout: 50\n'
      + ' + timeout: 20\n'
      + ' + verbose: true\n'
      + '}');
});
