import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const makePlain = (object) => {
  const iter = (tree, path) => {
    const filteredTree = tree.filter(({ type }) => type !== 'unchanged');
    const result = filteredTree.flatMap((node) => {
      const { key, type } = node;
      const currentPathElements = [...path, key];
      const currentPath = currentPathElements.join('.');
      switch (type) {
        case 'nested': {
          const { children } = node;
          return iter(children, currentPathElements);
        }
        case 'added': {
          const { value } = node;
          return `Property '${currentPath}' was added with value: ${stringify(value)}`;
        }
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed': {
          const { oldValue, newValue } = node;
          return `Property '${currentPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        }
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return result;
  };
  return iter(object, '');
};

export default (diff) => makePlain(diff).join('\n');
