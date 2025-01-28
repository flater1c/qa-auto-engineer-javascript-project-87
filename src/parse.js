import fs from 'fs';
import yaml from 'js-yaml';

const parseData = (data, fileFormat) => {
  if (fileFormat === '.json') {
    return JSON.parse(data);
  }
  if (fileFormat === '.yaml' || fileFormat === '.yml') {
    return yaml.load(data);
  }
  throw new Error(`Unsupported file format: ${fileFormat}`);
};

export default (file, fileFormat) => {
  try {
    const fileData = fs.readFileSync(file, 'utf8'); // Чтение файла
    return parseData(fileData, fileFormat); // Парсинг данных
  } catch (error) {
    console.error('Error while processing file(s):', error);
    throw error;
  }
};
