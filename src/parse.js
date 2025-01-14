import fs from 'fs';

const parseJSONFiles = (file1, file2) => {
  try {
    const data1 = fs.readFileSync(file1, 'utf8');
    const json1 = JSON.parse(data1);

    const data2 = fs.readFileSync(file2, 'utf8');
    const json2 = JSON.parse(data2);

    return { json1, json2 };
  } catch (error) {
    console.error('Ошибка при обработке файлов:', error);
    return null;
  }
};

export default parseJSONFiles;
