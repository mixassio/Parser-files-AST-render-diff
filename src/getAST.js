import _ from 'lodash';

const getTypeNode = (oldValue, newValue) => {
  if (oldValue === newValue) {
    return 'unchange';
  }
  if (oldValue === undefined) {
    return 'added';
  } else if (newValue === undefined) {
    return 'deleted';
  }
  return 'updated';
};


const createAST = (nodeBefore, nodeAfter) => {
  const allKeys = _.union(_.keys(nodeBefore), _.keys(nodeAfter));
  const AST = allKeys.reduce((acc, key) => {
    const oldValue = nodeBefore[key];
    const newValue = nodeAfter[key];
    if (!(oldValue instanceof Object) || !(newValue instanceof Object)) {
      const typeNode = getTypeNode(oldValue, newValue);
      const node = {
        old: oldValue,
        new: newValue,
        typeNode,
      };
      return { ...acc, [key]: { values: { ...node } } };
    }
    return { ...acc, [key]: { values: { typeNode: 'nested' }, children: createAST(oldValue, newValue) } };
  }, {});
  return AST;
};

export default createAST;
