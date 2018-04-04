#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1')
  .arguments('<file1> <file2>')
  .action((pathFile1, pathFile2) => {
    console.log(genDiff(pathFile1, pathFile2));
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
