import fs from 'fs';
import genDiff from '../src/genDiff';

test('genDiff', () => {
  const idealContent = fs.readFileSync(`${__dirname}/__fixtures__/answer.txt`, 'utf8')
  const pathFile1 = `${__dirname}/__fixtures__/before.json`;
  const pathFile2 = `${__dirname}/__fixtures__/after.json`;
  expect(genDiff(pathFile1, pathFile2)).toEqual(idealContent);
  const pathFile3 = `${__dirname}/__fixtures__/before.yaml`;
  const pathFile4 = `${__dirname}/__fixtures__/after.yaml`;
  expect(genDiff(pathFile3, pathFile4)).toEqual('{\n  + verbose: true\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n    host: hexlet.io\n}');
});
