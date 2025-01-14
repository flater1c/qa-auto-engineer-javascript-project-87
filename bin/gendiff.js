#!/usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import path from 'path';
import _ from 'lodash';
import parseJSONFiles from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const program = new Command();

const gendiff = (file1, file2) => {
  const result = ['{'];
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2).sort();
  uniqueKeys.forEach((key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      result.push(` + ${key}: ${_.get(file1, key)}`);
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      result.push(` - ${key}: ${_.get(file2, key)}`);
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        result.push(`   ${key}: ${file1[key]}`);
      } else {
        result.push(` - ${key}: ${file1[key]}`);
        result.push(` + ${key}: ${file2[key]}`);
      }
    }
  });
  result.push('}');
  return result.join('\n');
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<file1>', 'first file')
  .argument('<file2>', 'second file')
  .action((file1, file2) => {
    const absFile1 = path.isAbsolute(file1) ? file1 : path.join(__dirname, file1);
    const absFile2 = path.isAbsolute(file2) ? file2 : path.join(__dirname, file2);
    const result = parseJSONFiles(absFile1, absFile2);
    if (result) {
      console.log(gendiff(result.json1, result.json2));
    }
  });
program.parse();
