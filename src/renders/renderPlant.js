import _ from 'lodash';

const stringify = (data) => {
  if (data instanceof Object) {
    return 'complex value';
  }
  return `${data}`;
};

const renderPlant = (ast, prefix = '') => {
  const keys = _.keys(ast);
  const dif = keys.reduce((acc, key) => {
    const { [key]: { typeNode } } = ast;
    const oldValue = ast[key].old;
    const newValue = ast[key].new;
    switch (typeNode) {
      case 'deleted':
        return [`Property '${prefix}${key}' was removed`, ...acc];
      case 'added':
        return [`Property '${prefix}${key}' was added with value ${stringify(newValue)}`, ...acc];
      case 'updated':
        return [`Property '${prefix}${key}' was updated. From '${stringify(oldValue)}' to '${stringify(newValue)}'`, ...acc];
      default:
        return [renderPlant(ast[key].children, `${prefix}${key}.`), ...acc];
    }
  }, '');
  return [...dif].filter(el => el !== '').join('\n');
};

export default renderPlant;
