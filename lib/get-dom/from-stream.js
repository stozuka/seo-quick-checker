'use strict';

const fs = require('fs');
const cheerio = require('cheerio');

function fromStream(filePath, encoding = 'utf8') {
  const rs = fs.createReadStream(filePath, encoding);
  const chunks = [];

  return new Promise((resolve, reject) => {
    rs.on('data', (chunk) => chunks.push(chunk));
    rs.on('end', () => {
      const data = chunks.join('');
      return resolve(cheerio.load(data));
    });
    rs.on('error', (error) => reject(error));
  });
}

module.exports = { fromStream };
