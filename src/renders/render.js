import _ from 'lodash';

const stringify = (data, countSpases) => {
  if (data instanceof Object) {
    const key = _.keys(data)[0];
    return `{\n${' '.repeat(countSpases + 4)}  ${key}: ${data[key]}\n${' '.repeat(countSpases + 2)}}`;
  }
  return data;
};

const render = (ast, countSpases = 2) => {
  const keys = _.keys(ast);
  const spases = ' '.repeat(countSpases);
  const dif = keys.reduce((acc, key) => {
    if (ast[key].values.typeNode === 'unchange') {
      return [`${spases}  ${key}: ${stringify(ast[key].values.old, countSpases)}`, ...acc];
    }
    if (ast[key].values.typeNode === 'deleted') {
      return [`${spases}- ${key}: ${stringify(ast[key].values.old, countSpases)}`, ...acc];
    }
    if (ast[key].values.typeNode === 'added') {
      return [`${spases}+ ${key}: ${stringify(ast[key].values.new, countSpases)}`, ...acc];
    }
    if (ast[key].values.typeNode === 'updated') {
      return [`${spases}- ${key}: ${stringify(ast[key].values.old, countSpases)}\n${spases}+ ${key}: ${stringify(ast[key].values.new, countSpases)}`, ...acc];
    }
    if (ast[key].values.typeNode === 'nested') {
      return [`${spases}  ${key}: ${render(ast[key].children, countSpases + 4)}`, ...acc];
    }
    return null;
  }, '');
  return ['{', ...dif, `${' '.repeat(countSpases - 2)}}`].join('\n');
};

export default render;
