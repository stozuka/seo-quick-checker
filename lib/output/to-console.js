'use strict';

function toConsole(notices, connector = '\n') {
  if (!notices) {
    throw new Error('notices is required');
  }

  console.log(notices.join(connector));
}

module.exports = { toConsole };
