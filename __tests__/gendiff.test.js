import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import parseFile from '../src/fileProcessing.js';
import diffOutput from '../src/formatters/index.js';
import gendiff from '../src/gendiff.js';

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

test.each([
  ['stylish', parsedJson1, parsedJson2, stylishOutput],
  ['stylish', parsedYaml1, parsedYaml2, stylishOutput],
  ['plain', parsedYaml1, parsedYaml2, plainOutput],
  ['json', parsedYaml1, parsedYaml2, JSONOutput],
])('Checking JSON/YAML with %s output', (type, file1, file2, expected) => {
  expect(diffOutput(file1, file2, type)).toBe(expected);
});

test('Checking wrong output format type', () => {
  expect(() => {
    diffOutput(parsedYaml1, parsedYaml2, 'anytype');
  }).toThrow(Error);
});
test('Checking different file formats', () => {
  expect(() => {
    gendiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json');
  }).toThrow(Error);
});

test.each([
  ['non_existing_file.json', 'json'],
  ['file1.json', '.invalidformat'],
])('Throwing errors with invalid files: %#', (file, format) => {
  expect(() => {
    parseFile(getFixturePath(file), format);
  }).toThrow();
});
