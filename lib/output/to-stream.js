'use strict';

const fs = require('fs');
const Readable = require('stream').Readable;

function toStream(filePath, notices, connector = '\n', encoding = 'utf8') {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('toFile: 1st argument <string> is required');
  }
  if (!notices || !Array.isArray(notices)) {
    throw new Error('toFile: 2nd argument <array> is required');
  }
  if (typeof connector !== 'string') {
    throw new Error('toFile: 3rd argument must be <string>');
  }
  if (typeof encoding !== 'string') {
    throw new Error('toFile: 4th argument must be <string>');
  }

  const data = notices.join(connector);

  const rs = new Readable();
  rs.push(data);
  rs.push(null);

  const ws = fs.createWriteStream(filePath, encoding);

  return new Promise((resolve, reject) => {
    rs.on('data', (chunk) => ws.write(chunk));
    rs.on('end', () => resolve());
    rs.on('error', (error) => reject(error));
  });
}

module.exports = {toStream};
