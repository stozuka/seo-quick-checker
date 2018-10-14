'use strict';

function toConsole(notices, connector = '\n') {
  if (!notices || !Array.isArray(notices)) {
    throw new Error('toFile: 1nd argument <array> is required');
  }
  if (typeof connector !== 'string') {
    throw new Error('toFile: 2rd argument must be <string>');
  }

  console.log(notices.join(connector));
}

module.exports = { toConsole };
