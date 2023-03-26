import fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parsers.js';
import genDiff from './genDiff.js';
import stylish from './stylish.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getExtension = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2) => {
  const obj1 = parse(getData(filepath1), getExtension(filepath1));
  const obj2 = parse(getData(filepath2), getExtension(filepath2));
  const differences = genDiff(obj1, obj2);
  return stylish(differences);
};
