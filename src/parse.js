import fs from 'fs';
import yaml from 'js-yaml';

const parseJSONFiles = (file1, file2) => {
  try {
    const data1 = fs.readFileSync(file1, 'utf8');
    const output1 = JSON.parse(data1);

    const data2 = fs.readFileSync(file2, 'utf8');
    const output2 = JSON.parse(data2);

    return { output1, output2 };
  } catch (error) {
    console.error('Ошибка при обработке файлов:', error);
    return null;
  }
};

export const parseYMLFiles = (file1, file2) => {
  try {
    const data1 = fs.readFileSync(file1, 'utf8');
    const output1 = yaml.load(data1);

    const data2 = fs.readFileSync(file2, 'utf8');
    const output2 = yaml.load(data2);

    return { output1, output2 };
  } catch (error) {
    console.error('Ошибка при обработке файлов:', error);
    return null;
  }
};

export default parseJSONFiles;
