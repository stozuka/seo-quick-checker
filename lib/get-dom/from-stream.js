'use strict';

const cheerio = require('cheerio');

/**
 * @param {stream.Readable} rs - Required.
 * @returns {Promise}
 */
async function fromStream(rs) {
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
