#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import genDiff from '../lib/genDiff';

let pathFile1;
let pathFile2;
program
  .description('Compares two configuration files and shows a difference')
  .version('0.0.1')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    pathFile1 = file1;
    pathFile2 = file2;
  })
  .option('-f, --format [type]', 'Output format');
program.parse(process.argv);

const data1 = (fs.existsSync(pathFile1)) ? fs.readFileSync(pathFile1) : false;
const content1 = (data1) ? JSON.parse(data1) : {};
const data2 = (fs.existsSync(pathFile2)) ? fs.readFileSync(pathFile2) : false;
const content2 = (data2) ? JSON.parse(data2) : {};

console.log(genDiff(content1, content2));
