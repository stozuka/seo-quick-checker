'use strict';

const fs = require('fs');
const cheerio = require('cheerio');

/**
 * @param {string} filePath
 * @param {string} encoding
 * @returns {Promise}
 */
function fromStream(filePath, encoding = 'utf8') {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('fromStream: 1st argument <string> is required');
  }
  if (typeof encoding !== 'string') {
    throw new Error('fromStream: 2nd argument must be a type of <string>');
  }

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
