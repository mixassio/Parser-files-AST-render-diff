import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';

const CreateAST = (nodeBefore, nodeAfter) => {
  const allKeys = _.union(_.keys(nodeBefore), _.keys(nodeAfter));
  const AST = allKeys.reduce((acc, key) => {
    const node = {};
    if (!(nodeBefore[key] instanceof Object) || !(nodeAfter[key] instanceof Object)) {
      node.old = nodeBefore[key];
      node.new = nodeAfter[key];
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
      console.log(node);
      return { ...acc, [key]: { values: { ...node } } };
    }
    node.typeNode = 'nested';
    return { ...acc, [key]: { values: { ...node }, children: CreateAST(nodeBefore[key], nodeAfter[key]) } };
  }, {});
  return AST;
};


const genDiff = (pathFile1, pathFile2) => {
  const ext1 = path.extname(pathFile1);
  const ext2 = path.extname(pathFile2);

  const data1 = fs.readFileSync(pathFile1, 'utf8');
  const data2 = fs.readFileSync(pathFile2, 'utf8');
  const content1 = parse(ext1, data1);
  const content2 = parse(ext2, data2);
  const AST = CreateAST(content1, content2);
  console.log(JSON.stringify(AST));
  return AST;
};

export default genDiff;
