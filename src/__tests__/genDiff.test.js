import genDiff from '../lib/genDiff';

test('genDiff', () => {
  const a = { a: 1 };
  const b = { a: 1 };
  expect(genDiff(a, b)).toEqual('    a: 1');
  const d = 0;
  expect(genDiff(a, d)).toEqual('  - a: 1');
  expect(genDiff(d, a)).toEqual('  + a: 1');
  const c = { a: 2 };
  expect(genDiff(c, a)).toEqual('  - a: 2\n  + a: 1');
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
  expect(genDiff(obj1, obj2)).toEqual('  + verbose: true\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n    host: hexlet.io');
});
