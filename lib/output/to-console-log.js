'use strict';

/**
 * @param {string[]} notices
 * @param {string} [connector]
 */
function toConsoleLog(notices, connector = '\n') {
  if (!notices || !Array.isArray(notices)) {
    throw new Error('toConsoleLog: 1st argument <array> is required');
  }
  if (typeof connector !== 'string') {
    throw new Error('toConsoleLog: 2nd argument must be <string> or empty');
  }

  console.log(notices.join(connector));
}

module.exports = { toConsoleLog };
