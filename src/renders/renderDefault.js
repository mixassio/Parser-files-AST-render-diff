import _ from 'lodash';

const stringify = (data, countSpases) => {
  if (data instanceof Object) {
    const key = _.keys(data)[0];
    return `{\n${' '.repeat(countSpases + 4)}  ${key}: ${data[key]}\n${' '.repeat(countSpases + 2)}}`;
  }
  return data;
};

const renderDefault = (ast, countSpases = 2) => {
  const keys = _.keys(ast);
  const spases = ' '.repeat(countSpases);
  const dif = keys.reduce((acc, key) => {
    const { [key]: { typeNode } } = ast;
    const oldValue = ast[key].old;
    const newValue = ast[key].new;
    switch (typeNode) {
      case 'unchange':
        return [`${spases}  ${key}: ${stringify(oldValue, countSpases)}`, ...acc];
      case 'deleted':
        return [`${spases}- ${key}: ${stringify(oldValue, countSpases)}`, ...acc];
      case 'added':
        return [`${spases}+ ${key}: ${stringify(newValue, countSpases)}`, ...acc];
      case 'updated':
        return [`${spases}- ${key}: ${stringify(oldValue, countSpases)}`, `${spases}+ ${key}: ${stringify(newValue, countSpases)}`, ...acc];
      default:
        return [`${spases}  ${key}: ${renderDefault(ast[key].children, countSpases + 4)}`, ...acc];
    }
  }, '');
  return ['{', ...dif, `${' '.repeat(countSpases - 2)}}`].join('\n');
};

export default renderDefault;
