'use strict';

const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const cheerio = require('cheerio');

async function fromFile(filePath, encoding = 'utf8') {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('fromFile: 1st argument <string> is required');
  }
  if (typeof encoding !== 'string') {
    throw new Error('fromFile: 2nd argument must be a type of <string>');
  }

  try {
    const data = await readFile(filePath, encoding);
    return cheerio.load(data);
  } catch (error) {
    throw error;
  }
}

module.exports = { fromFile };
