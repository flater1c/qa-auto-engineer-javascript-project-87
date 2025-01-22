import _ from 'lodash';

const diff = (file1, file2) => {
  const result = ['{'];
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2).sort();
  uniqueKeys.forEach((key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      result.push(`  - ${key}: ${_.get(file1, key)}`);
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      result.push(`  + ${key}: ${_.get(file2, key)}`);
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        result.push(`    ${key}: ${file1[key]}`);
      } else {
        result.push(`  - ${key}: ${file1[key]}`);
        result.push(`  + ${key}: ${file2[key]}`);
      }
    }
  });
  result.push('}');
  return result.join('\n');
};

export default diff;
