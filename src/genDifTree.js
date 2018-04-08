import fs from 'fs';
import path from 'path';
import getParser from './parser';
import getRender from './renders';
import getAST from './getAST';


const genDiff = (pathFile1, pathFile2, type) => {
  const ext1 = path.extname(pathFile1);
  const ext2 = path.extname(pathFile2);

  const data1 = fs.readFileSync(pathFile1, 'utf8');
  const data2 = fs.readFileSync(pathFile2, 'utf8');
  const parse1 = getParser(ext1);
  const parse2 = getParser(ext2);
  const content1 = parse1(data1);
  const content2 = parse2(data2);

  const ast = getAST(content1, content2);

  const render = getRender(type);
  return render(ast);
};

export default genDiff;
