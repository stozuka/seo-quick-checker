'use strict';

const util = require('util');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);

async function toFile(filePath, notices, connector = '\n', options = null) {
  if (!filePath) {
    throw new Error('filePath is required');
  }
  if (!notices) {
    throw new Error('notices is required');
  }

  const data = notices.join(connector);

  try {
    await writeFile(filePath, data, options);
  } catch (error) {
    throw error;
  }
}

module.exports = {toFile};
