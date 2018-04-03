#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1')
  .arguments('<file1> <file2>')
  .action((pathFile1, pathFile2) => {
    const data1 = (fs.existsSync(pathFile1)) ? fs.readFileSync(pathFile1) : false;
    const content1 = (data1) ? JSON.parse(data1) : {};
    const data2 = (fs.existsSync(pathFile2)) ? fs.readFileSync(pathFile2) : false;
    const content2 = (data2) ? JSON.parse(data2) : {};
    console.log(genDiff(content1, content2));
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);


