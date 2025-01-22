#!/usr/bin/env node
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import path from 'path';
import diffOutput from '../formatters/index.js';
import parseJSONFiles, { parseYMLFiles } from '../src/parse.js';
import getExtension from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const program = new Command();
let result;

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'diff')
  .argument('<file1>', 'first file')
  .argument('<file2>', 'second file')
  .action((file1, file2, options) => {
    const absFile1 = path.isAbsolute(file1) ? file1 : path.join(__dirname, file1);
    const absFile2 = path.isAbsolute(file2) ? file2 : path.join(__dirname, file2);
    if (getExtension(absFile1).includes('.json') && getExtension(absFile2).includes('.json')) {
      result = parseJSONFiles(absFile1, absFile2);
    }
    if ((getExtension(absFile1).includes('.yml') && getExtension(absFile2).includes('.yml')) || (getExtension(absFile1).includes('.yaml') && getExtension(absFile2).includes('.yaml'))) {
      result = parseYMLFiles(absFile1, absFile2);
    }
    if (result) {
      console.log(diffOutput(result.output1, result.output2, options.format));
    }
  });
program.parse(process.argv);
