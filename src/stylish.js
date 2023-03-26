import _ from 'lodash';

const symbolForNew = '+ ';
const symbolForOld = '- ';
const symbolForNeutral = '  ';

const getLineIndent = (depth, space = ' ', spacesCount = 4, indentForSymbol = 2) => space.repeat(depth * spacesCount - indentForSymbol);
const getBracketIndent = (depth, space = ' ', spacesCount = 4) => space.repeat(depth * spacesCount);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getLineIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  const result = ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
  return result;
};

const makeStylish = (object) => {
  const iter = (tree, depth) => {
    const result = tree.map ((node) => {
      const { key, value, value1, value2, type } = node;
      switch (type) {
        case 'nested':
          return `${getLineIndent(depth)}${symbolForNeutral}${key}: {\n${iter(value, depth + 1).join('\n')}\n${getBracketIndent(depth)}}`;
        case 'added':
          return `${getLineIndent(depth)}${symbolForNew}${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getLineIndent(depth)}${symbolForOld}${key}: ${stringify(value, depth)}`;
        case 'changed':
          const oldLine = `${getLineIndent(depth)}${symbolForOld}${key}: ${stringify(value1, depth)}`;
          const newLine = `${getLineIndent(depth)}${symbolForNew}${key}: ${stringify(value2, depth)}`;
          return `${oldLine}\n${newLine}`;
        case 'unchanged':
          return `${getLineIndent(depth)}${symbolForNeutral}${key}: ${stringify(value, depth)}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return result;
  };
  return iter(object, 1);
}

export default (diff) => `{\n${makeStylish(diff).join('\n')}\n}`;
