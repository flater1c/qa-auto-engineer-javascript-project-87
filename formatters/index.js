import plain from './plain.js';
import stylish from './diff.js';
import json from './json.js';

export default (file1, file2, type = 'diff') => {
  if (type === 'plain') {
    return plain(file1, file2);
  }
  if (type === 'stylish') {
    return stylish(file1, file2);
  }
  if (type === 'json') {
    return json(file1, file2);
  }
  return null;
  // throw new Error('Allowed types are: plain, diff, json');
};
