import fs from 'fs';
import genDiffTree from '../src';

test('genDiff', () => {
  const idealContent = fs.readFileSync(`${__dirname}/__fixtures__/answer.txt`, 'utf8');
  const pathFile1 = `${__dirname}/__fixtures__/before.json`;
  const pathFile2 = `${__dirname}/__fixtures__/after.json`;
  expect(genDiffTree(pathFile1, pathFile2, 'stylish')).toEqual(idealContent);
  const pathFile3 = `${__dirname}/__fixtures__/before.yaml`;
  const pathFile4 = `${__dirname}/__fixtures__/after.yaml`;
  expect(genDiffTree(pathFile3, pathFile4, 'stylish')).toEqual(idealContent);
  const pathFile5 = `${__dirname}/__fixtures__/before.ini`;
  const pathFile6 = `${__dirname}/__fixtures__/after.ini`;
  expect(genDiffTree(pathFile5, pathFile6, 'stylish')).toEqual(idealContent);
});

test('genDiffTree', () => {
  const idealContent = fs.readFileSync(`${__dirname}/__fixtures__/answerTree.txt`, 'utf8');
  const pathFile1 = `${__dirname}/__fixtures__/beforeTree.json`;
  const pathFile2 = `${__dirname}/__fixtures__/afterTree.json`;
  expect(genDiffTree(pathFile1, pathFile2, 'stylish')).toEqual(idealContent);
  const pathFile3 = `${__dirname}/__fixtures__/beforeTree.yaml`;
  const pathFile4 = `${__dirname}/__fixtures__/afterTree.yaml`;
  expect(genDiffTree(pathFile3, pathFile4, 'stylish')).toEqual(idealContent);
  const pathFile5 = `${__dirname}/__fixtures__/beforeTree.ini`;
  const pathFile6 = `${__dirname}/__fixtures__/afterTree.ini`;
  expect(genDiffTree(pathFile5, pathFile6, 'stylish')).toEqual(idealContent);
});
