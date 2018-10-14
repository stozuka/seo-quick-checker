'use strict';

const { findMissingTag } = require('../rule-builders/find-missing-tag');

function headWithoutMetaDescription(dom) {
  return findMissingTag('head meta[name=description]')(dom);
}

module.exports = { headWithoutMetaDescription };
