import _ from 'lodash';

export default (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortedUniqueKeys = _.orderBy(uniqueKeys, [], ['asc']);

  const result = sortedUniqueKeys.reduce((acc, key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      return `${acc}  - ${key}: ${_.get(file1, key)}\n`;
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      return `${acc}  + ${key}: ${_.get(file2, key)}\n`;
    }
    if (file1[key] === file2[key]) {
      return `${acc}    ${key}: ${file1[key]}\n`;
    }
    return `${acc}  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
  }, '{\n');
  return `${result.trim()}\n}`;
};
