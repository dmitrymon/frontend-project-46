const makeString = (object) => {
  const strings = object.map((element) => {
    if (element.type === 'added') {
      return `  + ${element.key}: ${element.value}`;
    } if (element.type === 'deleted') {
      return `  - ${element.key}: ${element.value}`;
    } if (element.type === 'changed') {
      return `  - ${element.key}: ${element.value1}
  + ${element.key}: ${element.value2}`;
    }
    return `    ${element.key}: ${element.value}`;
  });

  const result = strings.join('\n');
  return `{
${result}
}`;
};

export default makeString;
