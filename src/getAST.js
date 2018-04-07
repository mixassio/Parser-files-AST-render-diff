import _ from 'lodash';

const createAST = (nodeBefore, nodeAfter) => {
  const allKeys = _.union(_.keys(nodeBefore), _.keys(nodeAfter));
  const AST = allKeys.reduce((acc, key) => {
    const oldValue = nodeBefore[key];
    const newValue = nodeAfter[key];
    const node = {};
    if (!(oldValue instanceof Object) || !(newValue instanceof Object)) {
      node.old = oldValue;
      node.new = newValue;
      if (node.new === node.old) {
        node.typeNode = 'unchange';
      } else {
        node.typeNode = 'updated';
      }
      if (node.old === undefined) {
        node.typeNode = 'added';
      } else if (node.new === undefined) {
        node.typeNode = 'deleted';
      }
      return { ...acc, [key]: { values: { ...node } } };
    }
    node.typeNode = 'nested';
    return { ...acc, [key]: { values: { ...node }, children: createAST(oldValue, newValue) } };
  }, {});
  return AST;
};

export default createAST;
