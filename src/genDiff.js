import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const compareKeys = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return `+ ${key}: ${obj2[key]}`;
    } if (!_.has(obj2, key)) {
      return `- ${key}: ${obj1[key]}`;
    } if (obj1[key] !== obj2[key]) {
      return `- ${key}: ${obj1[key]}
    + ${key}: ${obj2[key]}`;
    }
    return `  ${key}: ${obj1[key]}`;
  });

  const result = compareKeys.join('\n');
  return result;
};

export default genDiff;
