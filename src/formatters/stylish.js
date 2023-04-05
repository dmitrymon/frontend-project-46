import _ from 'lodash';

const symbolForNew = '+ ';
const symbolForOld = '- ';
const symbolForNeutral = '  ';
const indentForSymbol = 2;
const spacesCount = 4;

const getIndent = (depth, type = 'line', space = ' ') => (type === 'bracket' ? space.repeat(depth * spacesCount) : space.repeat(depth * spacesCount - indentForSymbol));

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  const result = ['{', ...lines, `${getIndent(depth, 'bracket')}}`].join('\n');
  return result;
};

const makeStylish = (object) => {
  const iter = (tree, depth) => {
    const result = tree.map((node) => {
      const { key, type } = node;
      switch (type) {
        case 'nested': {
          const { children } = node;
          return `${getIndent(depth)}${symbolForNeutral}${key}: {\n${iter(children, depth + 1).join('\n')}\n${getIndent(depth, 'bracket')}}`;
        }
        case 'added': {
          const { value } = node;
          return `${getIndent(depth)}${symbolForNew}${key}: ${stringify(value, depth)}`;
        }
        case 'deleted': {
          const { value } = node;
          return `${getIndent(depth)}${symbolForOld}${key}: ${stringify(value, depth)}`;
        }
        case 'changed': {
          const { oldValue, newValue } = node;
          const oldLine = `${getIndent(depth)}${symbolForOld}${key}: ${stringify(oldValue, depth)}`;
          const newLine = `${getIndent(depth)}${symbolForNew}${key}: ${stringify(newValue, depth)}`;
          return `${oldLine}\n${newLine}`;
        }
        case 'unchanged': {
          const { value } = node;
          return `${getIndent(depth)}${symbolForNeutral}${key}: ${stringify(value, depth)}`;
        }
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return result;
  };
  return iter(object, 1);
};

export default (diff) => `{\n${makeStylish(diff).join('\n')}\n}`;
