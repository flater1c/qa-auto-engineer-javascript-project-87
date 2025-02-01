const makeIndent = (depth) => ' '.repeat(depth * 4 - 2);

const stylish = (diffTree, depth = 1) => {
  const result = diffTree.map((node) => {
    const indent = makeIndent(depth);

    switch (node.status) {
      case 'added':
        return `${indent}+ ${node.key}: ${node.newValue}`;
      case 'removed':
        return `${indent}- ${node.key}: ${node.oldValue}`;
      case 'updated':
        return `${indent}- ${node.key}: ${node.oldValue}\n${indent}+ ${node.key}: ${node.newValue}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${node.value}`;
      default:
        throw new Error(`Unknown node status: ${node.status}`);
    }
  });

  return `{\n${result.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

export default stylish;
