import yaml from 'js-yaml';

const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
};

const parse = (data, extension) => parsers[extension](data);

export default parse;
