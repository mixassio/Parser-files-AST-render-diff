import genDiff from '../src/genDiff';

test('genDiff', () => {
  /*
  const a = { a: 1 };
  const b = { a: 1 };
  expect(genDiff(a, b)).toEqual('{\n    a: 1\n}');
  const d = 0;
  expect(genDiff(a, d)).toEqual('{\n  - a: 1\n}');
  expect(genDiff(d, a)).toEqual('{\n  + a: 1\n}');
  const c = { a: 2 };
  expect(genDiff(c, a)).toEqual('{\n  - a: 2\n  + a: 1\n}');
  const obj1 = {
    'host': 'hexlet.io',
    'timeout': 50,
    'proxy': '123.234.53.22'
  };
  const obj2 = {
    'timeout': 20,
    'verbose': true,
    'host': 'hexlet.io'
  };
  expect(genDiff(obj1, obj2)).toEqual('{\n  + verbose: true\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n    host: hexlet.io\n}');
  */
  const pathFile1 = './__fixtures__/before.json';
  const pathFile2 = './__fixtures__/after.json';
  expect(genDiff(pathFile1, pathFile2)).toEqual('{\n  + verbose: true\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n    host: hexlet.io\n}');
});
