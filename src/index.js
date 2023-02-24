import fs from 'fs';
import path from 'path';
import process from 'process';
import genDiff from './genDiff.js';

export default (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  const data1 = fs.readFileSync(absolutePath1, 'utf-8');
  const obj1 = JSON.parse(data1);
  const data2 = fs.readFileSync(absolutePath2, 'utf-8');
  const obj2 = JSON.parse(data2);
  return genDiff(obj1, obj2);
};
