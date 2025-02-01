import path from 'path';
import parseFile from './fileProcessing.js';
import diffOutput from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const absFile1 = path.resolve(file1);
  const absFile2 = path.resolve(file2);
  if (path.extname(absFile1) === path.extname(absFile2)) {
    const diffTree = buildDiffTree(
      parseFile(absFile1, path.extname(absFile1).slice(1)),
      parseFile(absFile2, path.extname(absFile2).slice(1)),
    );
    return diffOutput(diffTree, format);
  }
  throw new Error('Both files should have the same format, either yaml or json');
};

export default genDiff;
