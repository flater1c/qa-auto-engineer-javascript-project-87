import { fileURLToPath } from 'url';
import path from 'path';
import getExtension from './utils.js';
import parseJSONFiles, { parseYMLFiles } from './parse.js';
import diffOutput from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genDiff = (file1, file2, format) => {
  const absFile1 = path.isAbsolute(file1) ? file1 : path.join(__dirname, file1);
  const absFile2 = path.isAbsolute(file2) ? file2 : path.join(__dirname, file2);
  if (getExtension(absFile1).includes('.json') && getExtension(absFile2).includes('.json')) {
    return diffOutput(
      parseJSONFiles(absFile1, absFile2).output1,
      parseJSONFiles(absFile1, absFile2).output2,
      format,
    );
  }
  if ((getExtension(absFile1).includes('.yml') && getExtension(absFile2).includes('.yml')) || (getExtension(absFile1).includes('.yaml') && getExtension(absFile2).includes('.yaml'))) {
    return diffOutput(
      parseYMLFiles(absFile1, absFile2).output1,
      parseYMLFiles(absFile1, absFile2).output2,
      format,
    );
  }
  return null;
};

export default genDiff;
