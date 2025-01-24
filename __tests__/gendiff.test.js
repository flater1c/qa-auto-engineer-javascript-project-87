import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import parseJSONFiles, { parseYMLFiles } from '../src/parse.js';
import diffOutput from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const parsedJsons = parseJSONFiles(getFixturePath('file1.json'), getFixturePath('file2.json'));
const parsedYamls = parseYMLFiles(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
const plainOutput = fs.readFileSync(getFixturePath('plain_output.txt'), 'utf-8');
const stylishOutput = fs.readFileSync(getFixturePath('stylish_output.txt'), 'utf-8');
const JSONOutput = fs.readFileSync(getFixturePath('json_output.json'), 'utf-8');

test('Checking flat jsons', () => {
  expect(diffOutput(parsedJsons.output1, parsedJsons.output2, 'stylish')).toBe(stylishOutput);
});
test('Checking flat yamls', () => {
  expect(diffOutput(parsedYamls.output1, parsedYamls.output2, 'stylish')).toBe(stylishOutput);
});
test('Checking plain output', () => {
  expect(diffOutput(parsedYamls.output1, parsedYamls.output2, 'plain')).toBe(plainOutput);
});
test('Checking json output', () => {
  expect(diffOutput(parsedYamls.output1, parsedYamls.output2, 'json')).toBe(JSONOutput);
});
test('Checking wrong output format type', () => {
  expect(() => {
    diffOutput(parsedYamls.output1, parsedYamls.output2, 'anytype');
  }).toThrow(Error);
});
test('Checking invalid files parsing', () => {
  expect(parseJSONFiles(parsedJsons.output1 + '1', parsedJsons.output2 + '1')).toBeNull();
  expect(parseYMLFiles(parsedYamls.output1 + '1', parsedYamls.output2 + '1')).toBeNull();
});
