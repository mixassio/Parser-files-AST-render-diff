import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';

const genDiff = (pathFile1, pathFile2) => {
  const ext1 = path.extname(pathFile1);
  const ext2 = path.extname(pathFile2);

  const data1 = fs.readFileSync(pathFile1);
  const data2 = fs.readFileSync(pathFile2);

  const content1 = parse(ext1, data1);
  const content2 = parse(ext2, data2);

  const allKeys = _.union(_.keys(content1), _.keys(content2));

  const res = allKeys.reduce((acc, key) => {
    if (_.has(content1, key) && _.has(content2, key)) {
      return (content1[key] === content2[key]) ? [`    ${key}: ${content1[key]}`, ...acc] : [`  - ${key}: ${content1[key]}\n  + ${key}: ${content2[key]}`, ...acc];
    } else if (_.has(content1, key)) {
      return [`  - ${key}: ${content1[key]}`, ...acc];
    }
    return [`  + ${key}: ${content2[key]}`, ...acc];
  }, []);

  return ['{', ...res, '}'].join('\n');
};

export default genDiff;
