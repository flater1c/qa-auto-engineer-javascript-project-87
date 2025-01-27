import path from 'path';
import parseFile from './parse.js';
import diffOutput from './formatters/index.js';

const genDiff = (file1, file2, format) => {
  const absFile1 = path.resolve(file1);
  const absFile2 = path.resolve(file2);
  if (path.extname(absFile1) === path.extname(absFile2)) {
    return diffOutput(
      parseFile(absFile1, path.extname(absFile1)),
      parseFile(absFile2, path.extname(absFile1)),
      format,
    );
  }
  throw new Error('Both files should have the same format, either yaml or json');
};

export default genDiff;
