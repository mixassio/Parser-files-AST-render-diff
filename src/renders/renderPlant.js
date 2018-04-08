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
    const { [key]: { typeNode } } = ast;
    switch (typeNode) {
      case 'deleted':
        return console.log(`Property '${prefix}${key}' was removed`);
      case 'added':
        return console.log(`Property '${prefix}${key}' was added with value ${stringify(ast[key].new)}`);
      case 'updated':
        return console.log(`Property '${prefix}${key}' was updated. From '${stringify(ast[key].new)}' to '${stringify(ast[key].new)}'`);
      default:
        return renderPlant(ast[key].children, `${prefix}${key}.`);
    }
  }, '');
};

export default renderPlant;
