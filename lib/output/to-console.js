'use strict';

/**
 * @param {string[]} notices
 * @param {string} connector
 */
function toConsole(notices, connector = '\n') {
  if (!notices || !Array.isArray(notices)) {
    throw new Error('toFile: 1st argument <array> is required');
  }
  if (typeof connector !== 'string') {
    throw new Error('toFile: 2nd argument must be <string>');
  }

  console.log(notices.join(connector));
}

module.exports = { toConsole };
