import { test, expect } from '@jest/globals';
import * as path from 'path';
import url from 'url';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');

const resultpath = getFixturePath('expected.txt');
const result = fs.readFileSync(resultpath, 'utf-8');

test.each([
{ file1: jsonFile1, file2: jsonFile2, expected: result },
{ file1: yamlFile1, file2: yamlFile2, expected: result },
])('diff tests', (file1, file2, expected) => {

  expect(genDiff(file1, file2)).toBe(expected);
});
