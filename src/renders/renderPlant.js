import _ from 'lodash';

const stringify = (data) => {
  if (data instanceof Object) {
    return 'complex value';
  }
  return `${data}`;
};

const renderPlant = (ast, prefix = '') => {
  const keys = _.keys(ast);
  const dif = keys.map((key) => {
    const { [key]: { typeNode, old: oldValue, new: newValue } } = ast;
    switch (typeNode) {
      case 'deleted':
        return [`Property '${prefix}${key}' was removed`];
      case 'added':
        return [`Property '${prefix}${key}' was added with value ${stringify(newValue)}`];
      case 'updated':
        return [`Property '${prefix}${key}' was updated. From '${stringify(oldValue)}' to '${stringify(newValue)}'`];
      case 'nested':
        return [renderPlant(ast[key].children, `${prefix}${key}.`)];
      default:
        return [];
    }
  });
  return [..._.flatten(dif)].filter(el => el !== '').join('\n');
};

export default renderPlant;
