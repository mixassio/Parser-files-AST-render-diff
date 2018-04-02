#!/usr/bin/env node
console.log('hello, world')

var program = require('commander');

program
    .description('Compares two configuration files and shows a difference')
    .version ('0.0.1')
    .option('-f, --format [type]', 'Output format')

program.parse(process.argv);
console.log('hello, world')