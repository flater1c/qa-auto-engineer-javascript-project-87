import fs from 'fs';
import yaml from 'js-yaml';

export default (file, fileFormat) => {
  try {
    if (fileFormat === '.json') {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
    if (fileFormat === '.yaml' || fileFormat === '.yml') {
      return yaml.load(fs.readFileSync(file, 'utf8'));
    }
    throw new Error(`Неподдерживаемый формат файла: ${fileFormat}`);
  } catch (error) {
    console.error('Ошибка при обработке файлов:', error);
    throw error;
  }
};
