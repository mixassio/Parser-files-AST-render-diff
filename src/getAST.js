import _ from 'lodash';

const getTypeNode = (nodeBefore, nodeAfter, key) => {
  if (nodeBefore[key] === nodeAfter[key]) {
    return 'unchange';
  }
  if (!_.has(nodeBefore, key)) {
    return 'added';
  } else if (!_.has(nodeAfter, key)) {
    return 'deleted';
  }
  return 'updated';
};

const createAST = (nodeBefore, nodeAfter) => {
  const allKeys = _.union(_.keys(nodeBefore), _.keys(nodeAfter));
  const ast = allKeys.reduce((acc, key) => {
    if (!(nodeBefore[key] instanceof Object) || !(nodeAfter[key] instanceof Object)) {
      const typeNode = getTypeNode(nodeBefore, nodeAfter, key);
      const node = {
        old: nodeBefore[key],
        new: nodeAfter[key],
        typeNode,
      };
      return { ...acc, [key]: { ...node } };
    }
    return { ...acc, [key]: { typeNode: 'nested', children: createAST(nodeBefore[key], nodeAfter[key]) } };
  }, {});
  return ast;
};

export default createAST;
