'use strict';

const { tagExists } = require('../rule-builders/tag-exists');

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @returns {string} - notice string or empty string if there is no notice
 */
function noMetaDescriptionInHead(dom) {
  return tagExists('head meta[name=description]')(dom);
}

module.exports = { noMetaDescriptionInHead };
