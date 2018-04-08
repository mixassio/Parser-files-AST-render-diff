import _ from 'lodash';

const stringify = (data) => {
  if (data instanceof Object) {
    return 'complex value';
  }
  return `${data}`;
};

const renderPlant = (ast, prefix = '') => {
  const keys = _.keys(ast);
  return keys.reduce((acc, key) => {
    if (ast[key].values.typeNode === 'deleted') {
      console.log(`Property '${prefix}${key}' was removed`);
    }
    if (ast[key].values.typeNode === 'added') {
      console.log(`Property '${prefix}${key}' was added with value ${stringify(ast[key].values.new)}`);
    }
    if (ast[key].values.typeNode === 'updated') {
      console.log(`Property '${prefix}${key}' was updated. From '${stringify(ast[key].values.new)}' to '${stringify(ast[key].values.new)}'`);
    }
    if (ast[key].values.typeNode === 'nested') {
      return renderPlant(ast[key].children, `${prefix}${key}.`);
    }
    return null;
  }, '');
};

export default renderPlant;

