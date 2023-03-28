import stylish from './stylish.js';
import plain from './plain.js';

const formatters = { stylish, plain, json: JSON.stringify };

const format = (diff, formatName) => formatters[formatName](diff);

export default format;
