import plain from './plain.js';
import diff from './diff.js';

export default (file1, file2, type) => {
  if (type === 'plain') {
    return plain(file1, file2);
  }
  if (type === 'diff') {
    return diff(file1, file2);
  }
  return null;
};
