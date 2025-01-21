import _ from 'lodash';

const plain = (file1, file2) => {
  let result = '';
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2).sort();
  uniqueKeys.forEach((key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      result = `${result}Property ${key} was removed\n`;
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      result = `${result}Property ${key} was added with value: ${_.get(file2, key)}\n`;
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] !== file2[key]) {
        result = `${result}Property ${key}  was updated. From ${_.get(file1, key)} to ${_.get(file2, key)}\n`;
      }
    }
  });
  return result;
};

export default plain;
