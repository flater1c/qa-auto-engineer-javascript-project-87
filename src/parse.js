import fs from 'fs';
import yaml from 'js-yaml';

export default (file, fileFormat) => {
  try {
    if (fileFormat === 'json') {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
    if (fileFormat === 'yaml') {
      return yaml.load(fs.readFileSync(file, 'utf8'));
    }
  } catch (error) {
    console.error('Ошибка при обработке файлов:', error);
  }
  return null;
};
