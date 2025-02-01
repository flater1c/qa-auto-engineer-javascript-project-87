const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]';
  return typeof value === 'string' ? `"${value}"` : value;
};

const plain = (diffTree, parentKey = '') => {
  const result = diffTree
    .filter((node) => node.status !== 'unchanged')
    .map((node) => {
      const keyPath = parentKey ? `${parentKey}.${node.key}` : node.key;

      switch (node.status) {
        case 'added':
          return `Property '${keyPath}' was added with value: ${formatValue(node.newValue)}`;
        case 'removed':
          return `Property '${keyPath}' was removed`;
        case 'updated':
          return `Property '${keyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        default:
          throw new Error(`Unknown node status: ${node.status}`);
      }
    });

  return result.join('\n');
};

export default plain;
