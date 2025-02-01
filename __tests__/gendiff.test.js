import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filePathYml1 = '__fixtures__/file1.yml';
const filePathYml2 = '__fixtures__/file2.yml';
const filePathJson1 = '__fixtures__/file1.json';
const filePathJson2 = '__fixtures__/file2.json';

const plainOutput = fs.readFileSync(getFixturePath('plain_output.txt'), 'utf-8');
const stylishOutput = fs.readFileSync(getFixturePath('stylish_output.txt'), 'utf-8');
const JSONOutput = fs.readFileSync(getFixturePath('json_output.json'), 'utf-8');

test.each([
  [filePathJson1, filePathJson2, 'stylish', stylishOutput],
  [filePathYml1, filePathYml2, 'plain', plainOutput],
  [filePathYml1, filePathYml2, 'json', JSONOutput],
])('Checking %s format', (filePath1, filePath2, format, expected) => {
  expect(gendiff(filePath1, filePath2, format)).toBe(expected);
});

test.each([
  [filePathYml1, filePathYml2, 'anytype'],
  [filePathJson1, filePathYml2, 'json'],
  ['non_existing_file.json', 'non_existing_file2.json', 'json'],
  [filePathYml1, filePathYml2, 'invalidformat'],
])('Checking throwing error %#', (filePath1, filepath2, format) => {
  expect(() => {
    gendiff(filePath1, filepath2, format);
  }).toThrow();
});
