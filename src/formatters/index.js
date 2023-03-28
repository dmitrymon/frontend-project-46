import stylish from './stylish.js';
import plain from './plain.js';

const formatters = { stylish, plain };

const format = (diff, formatName) => formatters[formatName](diff);

export default format;
