import _ from 'lodash';

export default (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortedUniqueKeys = _.orderBy(uniqueKeys, [], ['asc']);

  const result = sortedUniqueKeys.map((key) => {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      return {
        key,
        status: 'removed',
        oldValue: _.get(file1, key),
      };
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      return {
        key,
        status: 'added',
        newValue: _.get(file2, key),
      };
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        return {
          key,
          status: 'unchanged',
          value: _.get(file1, key),
        };
      }
      return {
        key,
        status: 'updated',
        oldValue: _.get(file1, key),
        newValue: _.get(file2, key),
      };
    }
    return null;
  }, '');
  return JSON.stringify(result, null, 2);
};
