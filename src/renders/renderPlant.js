import _ from 'lodash';
import strindfy from './stringfyPlant';

const renderPlant = (AST, prefix = '') => {
  const keys = _.keys(AST);
  return keys.reduce((acc, key) => {
    if (AST[key].values.typeNode === 'deleted') {
      console.log(`Property '${prefix}${key}' was removed`);
    }
    if (AST[key].values.typeNode === 'added') {
      console.log(`Property '${prefix}${key}' was added with ${strindfy(AST[key].values.new)}`);
    }
    if (AST[key].values.typeNode === 'updated') {
      console.log(`Property '${prefix}${key}' was updated. From ${strindfy(AST[key].values.new)} to ${strindfy(AST[key].values.new)}`);
    }
    if (AST[key].values.typeNode === 'nested') {
      return renderPlant(AST[key].children, `${key}.`);
    }
    return null;
  }, '');
};

export default renderPlant;

