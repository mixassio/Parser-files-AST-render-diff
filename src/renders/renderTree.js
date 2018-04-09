import _ from 'lodash';

const stringify = (data, countSpases) => {
  if (data instanceof Object) {
    const key = _.keys(data)[0];
    return `{\n${' '.repeat(countSpases + 4)}  ${key}: ${data[key]}\n${' '.repeat(countSpases + 2)}}`;
  }
  return data;
};

const renderTree = (ast, countSpases = 2) => {
  const keys = _.keys(ast);
  const spases = ' '.repeat(countSpases);
  const dif = keys.map((key) => {
    const { [key]: { typeNode, old: oldValue, new: newValue } } = ast;
    switch (typeNode) {
      case 'unchange':
        return `${spases}  ${key}: ${stringify(oldValue, countSpases)}`;
      case 'deleted':
        return `${spases}- ${key}: ${stringify(oldValue, countSpases)}`;
      case 'added':
        return `${spases}+ ${key}: ${stringify(newValue, countSpases)}`;
      case 'updated':
        return [`${spases}- ${key}: ${stringify(oldValue, countSpases)}`, `${spases}+ ${key}: ${stringify(newValue, countSpases)}`];
      case 'nested':
        return `${spases}  ${key}: ${renderTree(ast[key].children, countSpases + 4)}`;
      default:
        return [];
    }
  });
  return ['{', ..._.flatten(dif), `${' '.repeat(countSpases - 2)}}`].join('\n');
};

export default renderTree;
