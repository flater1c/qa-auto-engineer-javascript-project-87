#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/gendiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<file1>', 'first file')
  .argument('<file2>', 'second file')
  .action((file1, file2, options) => {
    console.log(genDiff(file1, file2, options.format));
  });
program.parse(process.argv);
