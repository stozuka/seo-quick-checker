'use strict';

const fs = require('fs');
const Readable = require('stream').Readable;

function toStream(filePath, notices, connector, encoding = 'utf8') {
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

module.exports = { toStream };
