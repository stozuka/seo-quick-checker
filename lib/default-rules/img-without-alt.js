'use strict';

const { tagMissingAttr } = require('../rule-builders/tag-missing-attr');

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @returns {string} - notice string or empty string if there is no notice
 */
function imgWithoutAlt(dom) {
  return tagMissingAttr('img', 'alt')(dom);
}

module.exports = { imgWithoutAlt };
