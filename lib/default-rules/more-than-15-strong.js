'use strict';

const { countTag } = require('../rule-builders/count-tag');

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @returns {string} - notice string or empty string if there is no notice
 */
function moreThan15Strong(dom) {
  return countTag('strong', 15)(dom);
}

module.exports = { moreThan15Strong };
