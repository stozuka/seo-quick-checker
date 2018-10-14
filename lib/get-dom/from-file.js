'use strict';

const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const cheerio = require('cheerio');

async function fromFile(filePath, encoding = 'utf8') {
  try {
    const data = await readFile(filePath, encoding);
    return cheerio.load(data);
  } catch (error) {
    throw error;
  }
}

module.exports = { fromFile };
