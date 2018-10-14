'use strict';

const { findMissingAttr } = require('../rule-builders/find-missing-attr');

function aWithoutRel(dom) {
  return findMissingAttr('a', 'rel')(dom);
}

module.exports = { aWithoutRel };
