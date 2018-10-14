'use strict';

const { findMissingTag } = require('../rule-builders/find-missing-tag');

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @returns {string} - notice string or empty string if there is no notice
 */
function headWithoutTitle(dom) {
  return findMissingTag('head title')(dom);
}

module.exports = { headWithoutTitle };
