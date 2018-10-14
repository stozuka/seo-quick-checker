'use strict';

const { findMissingAttr } = require('../rule-builders/find-missing-attr');

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @returns {string} - notice string or empty string if there is no notice
 */
function aWithoutRel(dom) {
  return findMissingAttr('a', 'rel')(dom);
}

module.exports = { aWithoutRel };
