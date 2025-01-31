import _ from 'lodash';

export default (file1, file2, outputType = 'stylish') => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortedUniqueKeys = _.orderBy(uniqueKeys, [], ['asc']);

  const mappedResults = sortedUniqueKeys.map((key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      switch (outputType) {
        case 'stylish':
          return `  - ${key}: ${_.get(file1, key)}\n`;
        case 'plain':
          return `Property '${key}' was removed\n`;
        case 'json':
          return {
            key,
            status: 'removed',
            oldValue: _.get(file1, key),
          };
        default:
          return null;
      }
    }

    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      switch (outputType) {
        case 'stylish':
          return `  + ${key}: ${_.get(file2, key)}\n`;
        case 'plain':
          return `Property '${key}' was added with value: ${_.get(file2, key)}\n`;
        case 'json':
          return {
            key,
            status: 'added',
            newValue: _.get(file2, key),
          };
        default:
          throw new Error('Allowed format types are: plain, stylish, json');
      }
    }

    if (file1[key] === file2[key]) {
      switch (outputType) {
        case 'stylish':
          return `    ${key}: ${file1[key]}\n`;
        case 'plain':
          return null;
        case 'json':
          return {
            key,
            status: 'unchanged',
            value: _.get(file1, key),
          };
        default:
          throw new Error('Allowed format types are: plain, stylish, json');
      }
    }

    if (file1[key] !== file2[key]) {
      switch (outputType) {
        case 'stylish':
          return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
        case 'plain':
          return `Property '${key}' was updated. From ${_.get(file1, key)} to ${_.get(file2, key)}\n`;
        case 'json':
          return {
            key,
            status: 'updated',
            oldValue: _.get(file1, key),
            newValue: _.get(file2, key),
          };
        default:
          throw new Error('Allowed format types are: plain, stylish, json');
      }
    }

    return null;
  });
  if (outputType === 'json') {
    return JSON.stringify(mappedResults.filter(Boolean), null, 2);
  }
  const result = mappedResults.filter(Boolean).join('');

  switch (outputType) {
    case 'stylish':
      return `{\n${result}}`;
    case 'plain':
      return result.trim();
    default:
      throw new Error('Allowed format types are: plain, stylish, json');
  }
};
