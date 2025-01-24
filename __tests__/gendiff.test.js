import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import parseFile from '../src/parse.js';
import diffOutput from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const parsedJson1 = parseFile(getFixturePath('file1.json'), 'json');
const parsedJson2 = parseFile(getFixturePath('file2.json'), 'json');
const parsedYaml1 = parseFile(getFixturePath('file1.yml'), 'yaml');
const parsedYaml2 = parseFile(getFixturePath('file2.yml'), 'yaml');
const plainOutput = fs.readFileSync(getFixturePath('plain_output.txt'), 'utf-8');
const stylishOutput = fs.readFileSync(getFixturePath('stylish_output.txt'), 'utf-8');
const JSONOutput = fs.readFileSync(getFixturePath('json_output.json'), 'utf-8');

test('Checking flat jsons', () => {
  expect(diffOutput(parsedJson1, parsedJson2, 'stylish')).toBe(stylishOutput);
});
test('Checking flat yamls', () => {
  expect(diffOutput(parsedYaml1, parsedYaml2, 'stylish')).toBe(stylishOutput);
});
test('Checking plain output', () => {
  expect(diffOutput(parsedYaml1, parsedYaml2, 'plain')).toBe(plainOutput);
});
test('Checking json output', () => {
  expect(diffOutput(parsedYaml1, parsedYaml2, 'json')).toBe(JSONOutput);
});
test('Checking wrong output format type', () => {
  expect(() => {
    diffOutput(parsedYaml1, parsedYaml2, 'anytype');
  }).toThrow(Error);
});
test('Checking invalid files parsing', () => {
  expect(parseFile(parsedJson1 + '1', 'json')).toBeNull();
  expect(parseFile(parsedYaml1 + '1', 'yaml')).toBeNull();
});
