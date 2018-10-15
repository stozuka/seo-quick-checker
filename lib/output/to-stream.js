'use strict';

const Readable = require('stream').Readable;

/**
 * @param {stream.Writable} ws
 * @param {string[]} notices
 * @param {string} [connector]
 * @returns {Promise}
 */
async function toStream(ws, notices, connector = '\n') {
  if (!ws) {
    throw new Error('toStream: 1st argument <stream.Writable> is required');
  }
  if (!notices || !Array.isArray(notices)) {
    throw new Error('toStream: 2nd argument <array> is required');
  }
  if (typeof connector !== 'string') {
    throw new Error('toStream: 3rd argument must be <string>');
  }

  const data = notices.join(connector);

  // Create readable stream from string
  const rs = new Readable();
  rs.push(data);
  rs.push(null);

  return new Promise((resolve, reject) => {
    rs.on('data', (chunk) => ws.write(chunk));
    rs.on('end', () => resolve());
    rs.on('error', (error) => reject(error));
  });
}

module.exports = { toStream };
