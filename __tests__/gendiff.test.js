import { test, expect } from '@jest/globals';
import path from 'path';
import url from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');

const getExpected = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedStylish = getExpected('expectedStylish.txt');
const expectedPlain = getExpected('expectedPlain.txt');
const expectedJSON = getExpected('expectedJSON.txt');

test.each([
  {
    file1: jsonFile1, file2: jsonFile2, formatName: 'stylish', expected: expectedStylish,
  },
  {
    file1: jsonFile1, file2: jsonFile2, formatName: 'plain', expected: expectedPlain,
  },
  {
    file1: jsonFile1, file2: jsonFile2, formatName: 'json', expected: expectedJSON,
  },
  {
    file1: yamlFile1, file2: yamlFile2, formatName: 'stylish', expected: expectedStylish,
  },
  {
    file1: yamlFile1, file2: yamlFile2, formatName: 'plain', expected: expectedPlain,
  },
  {
    file1: yamlFile1, file2: yamlFile2, formatName: 'json', expected: expectedJSON,
  },
])('diff tests', ({
  file1, file2, formatName, expected
}) => {
  expect(genDiff(file1, file2, formatName)).toBe(expected);
});
