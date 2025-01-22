import { fileURLToPath } from 'url';
import path from 'path';
import parseJSONFiles, { parseYMLFiles } from '../src/parse.js';
import diffOutput from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const parsedJsons = parseJSONFiles(getFixturePath('file1.json'), getFixturePath('file2.json'));
const parsedYamls = parseYMLFiles(getFixturePath('file1.yml'), getFixturePath('file2.yml'));

test('Checking flat jsons', () => {
  expect(diffOutput(parsedJsons.output1, parsedJsons.output2, 'diff')).toEqual('{\n'
        + '  - follow: false\n'
        + '    host: hexlet.io\n'
        + '  - proxy: 123.234.53.22\n'
        + '  - timeout: 50\n'
        + '  + timeout: 20\n'
        + '  + verbose: true\n'
        + '}');
});
test('Checking flat yamls', () => {
  expect(diffOutput(parsedYamls.output1, parsedYamls.output2, 'diff')).toEqual('{\n'
      + '  - follow: false\n'
      + '    host: hexlet.io\n'
      + '  - proxy: 123.234.53.22\n'
      + '  - timeout: 50\n'
      + '  + timeout: 20\n'
      + '  + verbose: true\n'
      + '}');
});
test('Checking plain output', () => {
  expect(diffOutput(parsedYamls.output1, parsedYamls.output2, 'plain')).toEqual('Property follow was removed\n'
      + 'Property proxy was removed\n'
      + 'Property timeout was updated. From 50 to 20\n'
      + 'Property verbose was added with value: true\n');
});
test('Checking json output', () => {
  expect(diffOutput(parsedYamls.output1, parsedYamls.output2, 'json')).toEqual({
    changes: [
      { key: 'follow', status: 'removed', oldValue: false },
      { key: 'host', status: 'unchanged', value: 'hexlet.io' },
      { key: 'proxy', status: 'removed', oldValue: '123.234.53.22' },
      {
        key: 'timeout', status: 'updated', oldValue: 50, newValue: 20,
      },
      { key: 'verbose', status: 'added', newValue: true },
    ],
  });
});
