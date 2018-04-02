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

try {
  var data1 = fs.readFileSync(pathFile1);
} catch (e) {
  console.error(err);
}
const content1 = JSON.parse(data1);
try {
  var data2 = fs.readFileSync(pathFile2);
} catch(e) {
  console.error(err);
}
const content2 = JSON.parse(data2);

console.log(genDiff(content1, content2));
