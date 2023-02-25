import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const compareKeys = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    } if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    } if (obj1[key] !== obj2[key]) {
      return {
        key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'changed',
      };
    }
    return { key, value: obj1[key], type: 'unchanged' };
  });

  const strings = compareKeys.map((element) => {
    if (element.type === 'added') {
      return `+ ${element.key}: ${element.value}`;
    } if (element.type === 'deleted') {
      return `- ${element.key}: ${element.value}`;
    } if (element.type === 'changed') {
      return `- ${element.key}: ${element.value1}
      + ${element.key}: ${element.value2}`;
    }
    return ` ${element.key}: ${element.value}`;
  });

  const result = strings.join('\n');
  return `{
    ${result}
  }`;
};

export default genDiff;
