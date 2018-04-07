import _ from 'lodash';
import stringify from './stringify';

const render = (AST, countSpases = 2) => {
  const keys = _.keys(AST);
  const spases = ' '.repeat(countSpases);
  const dif = keys.reduce((acc, key) => {
    if (AST[key].values.typeNode === 'unchange') {
      return [`${spases}  ${key}: ${stringify(AST[key].values.old, countSpases)}`, ...acc];
    }
    if (AST[key].values.typeNode === 'deleted') {
      return [`${spases}- ${key}: ${stringify(AST[key].values.old, countSpases)}`, ...acc];
    }
    if (AST[key].values.typeNode === 'added') {
      return [`${spases}+ ${key}: ${stringify(AST[key].values.new, countSpases)}`, ...acc];
    }
    if (AST[key].values.typeNode === 'updated') {
      return [`${spases}- ${key}: ${stringify(AST[key].values.old, countSpases)}\n${spases}+ ${key}: ${stringify(AST[key].values.new, countSpases)}`, ...acc];
    }
    if (AST[key].values.typeNode === 'nested') {
      return [`${spases}  ${key}: ${render(AST[key].children, countSpases + 4)}`, ...acc];
    }
    return null;
  }, '');
  return ['{', ...dif, `${' '.repeat(countSpases - 2)}}`].join('\n');
};

export default render;
