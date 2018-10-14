'use strict';

const { findMissingTag } = require('../rule-builders/find-missing-tag');

function headWithoutMetaKeywords(dom) {
  return findMissingTag('head meta[name=keywords]')(dom);
}

module.exports = { headWithoutMetaKeywords };
