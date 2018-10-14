'use strict';

const util = require('util');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);

async function toFile(filePath, notices, connector = '\n', options = {}) {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('toFile: 1st argument <string> is required');
  }
  if (!notices || !Array.isArray(notices)) {
    throw new Error('toFile: 2nd argument <array> is required');
  }
  if (typeof connector !== 'string') {
    throw new Error('toFile: 3rd argument must be <string>');
  }
  if (typeof options !== 'object') {
    throw new Error('toFile: 4th argument must be <object>');
  }

  const data = notices.join(connector);

  try {
    await writeFile(filePath, data, options);
  } catch (error) {
    throw error;
  }
}

module.exports = { toFile };
