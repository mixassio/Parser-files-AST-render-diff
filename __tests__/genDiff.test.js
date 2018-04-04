import genDiff from '../src/genDiff';

test('genDiff', () => {
  const pathFile1 = `${__dirname}/__fixtures__/before.json`;
  const pathFile2 = `${__dirname}/__fixtures__/after.json`;
  expect(genDiff(pathFile1, pathFile2)).toEqual('{\n  + verbose: true\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n    host: hexlet.io\n}');
});
