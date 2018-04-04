import _ from 'lodash';
import fs from 'fs';

const genDiff = (pathFile1, pathFile2) => {
  const data1 = (fs.existsSync(pathFile1)) ? fs.readFileSync(pathFile1) : false;
  const content1 = (data1) ? JSON.parse(data1) : {};
  const data2 = (fs.existsSync(pathFile2)) ? fs.readFileSync(pathFile2) : false;
  const content2 = (data2) ? JSON.parse(data2) : {};

  console.log(pathFile1, pathFile2, 'test');
  const allKeys = Object.keys({ ...content1, ...content2 });
  console.log(allKeys, content1, content2);
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
