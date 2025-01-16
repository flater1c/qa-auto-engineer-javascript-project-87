#!/usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/gendiff.js';
import parseJSONFiles from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const program = new Command();

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
