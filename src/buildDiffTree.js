import _ from 'lodash';

const buildDiffTree = (file1, file2) => {
  const uniqueKeys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedUniqueKeys = _.orderBy(uniqueKeys, [], ['asc']);

  return sortedUniqueKeys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return { key, status: 'added', newValue: file2[key] };
    }
    if (!Object.hasOwn(file2, key)) {
      return { key, status: 'removed', oldValue: file1[key] };
    }
    if (file1[key] !== file2[key]) {
      return {
        key, status: 'updated', oldValue: file1[key], newValue: file2[key],
      };
    }
    return { key, status: 'unchanged', value: file1[key] };
  });
};

export default buildDiffTree;
