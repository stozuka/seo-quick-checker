'use strict';

const { findMissingTag } = require('../rule-builders/find-missing-tag');

function headWithoutTitle(dom) {
  return findMissingTag('head title')(dom);
}

module.exports = { headWithoutTitle };
