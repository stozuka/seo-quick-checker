'use strict';

const { findMissingAttr } = require('../rule-builders/find-missing-attr');

function imgWithoutAlt(dom) {
  return findMissingAttr('img', 'alt')(dom);
}

module.exports = { imgWithoutAlt };
