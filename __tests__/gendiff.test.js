import path from 'path';
import url from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures', filename);

test('fileJSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const resultpath = getFixturePath('expectedJSON.txt');
  const result = JSON.parse(fs.readFileSync(resultpath, 'utf-8'));

  expect(genDiff(filepath1, filepath2)).toBe(result);
});
