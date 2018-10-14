'use strict';

const { countTag } = require('../rule-builders/count-tag');

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @returns {string} - notice string or empty string if there is no notice
 */
function moreThan1H1(dom) {
  return countTag('h1', 1)(dom);
}

module.exports = { moreThan1H1 };
