import fs from 'fs';
import path from 'path';
import parse from './parser';
import { render, renderPlant } from './renders';
import createAST from './getAST';


const genDiff = (pathFile1, pathFile2, type) => {
  const ext1 = path.extname(pathFile1);
  const ext2 = path.extname(pathFile2);

  const data1 = fs.readFileSync(pathFile1, 'utf8');
  const data2 = fs.readFileSync(pathFile2, 'utf8');
  const content1 = parse(ext1, data1);
  const content2 = parse(ext2, data2);
  const AST = createAST(content1, content2);
  if (type === 'plant') {
    return renderPlant(AST);
  }
  return render(AST);
};

export default genDiff;
