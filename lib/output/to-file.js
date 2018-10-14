'use strict';

const util = require('util');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);

async function toFile(filePath, notices, connector, options = null) {
  const data = notices.join(connector);

  try {
    await writeFile(filePath, data, options);
  } catch (error) {
    throw error;
  }
}

module.exports = { toFile };
