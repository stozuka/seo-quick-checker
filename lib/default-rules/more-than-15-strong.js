'use strict';

const { tagCountMoreThan } = require('../rule-builders/tag-count-more-than');

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @returns {string} - notice string or empty string if there is no notice
 */
function moreThan15Strong(dom) {
  return tagCountMoreThan('strong', 15)(dom);
}

module.exports = { moreThan15Strong };
