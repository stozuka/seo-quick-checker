'use strict';

function toConsole(notices, connector) {
  console.log(notices.join(connector));
}

module.exports = { toConsole };
