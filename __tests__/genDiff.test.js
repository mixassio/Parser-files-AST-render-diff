import fs from 'fs';
import genDiff from '../src/genDiff';

test('genDiff', () => {
  const idealContent = fs.readFileSync(`${__dirname}/__fixtures__/answer.txt`, 'utf8')
  const pathFile1 = `${__dirname}/__fixtures__/before.json`;
  const pathFile2 = `${__dirname}/__fixtures__/after.json`;
  expect(genDiff(pathFile1, pathFile2)).toEqual(idealContent);
  const pathFile3 = `${__dirname}/__fixtures__/before.yaml`;
  const pathFile4 = `${__dirname}/__fixtures__/after.yaml`;
  expect(genDiff(pathFile3, pathFile4)).toEqual(idealContent);
  const pathFile5 = `${__dirname}/__fixtures__/before.ini`;
  const pathFile6 = `${__dirname}/__fixtures__/after.ini`;
  expect(genDiff(pathFile5, pathFile6)).toEqual(idealContent);
});
