import fs from 'fs';
import parseData from './parse.js';

export default (file, fileFormat) => {
  try {
    const fileData = fs.readFileSync(file, 'utf8');
    return parseData(fileData, fileFormat);
  } catch (error) {
    console.error('Error while processing file(s):', error);
    throw error;
  }
};
