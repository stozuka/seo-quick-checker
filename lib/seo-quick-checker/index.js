'use strict';

/**
 * @param {Function} dom - dom function created by cheerio.load()
 * @param {Function[]} rules
 * @returns {string[]}
 */
function seoQuickChecker(dom, rules) {
  if (!dom || typeof dom !== 'function') {
    throw new Error('seoQuickChecker: 1st argument <function> is required');
  }
  if (!rules || !Array.isArray(rules)) {
    throw new Error('seoQuickChecker: 2nd argument <array> is required');
  }

  const notices = [];

  for (const rule of rules) {
    const notice = rule(dom);
    if (notice) {
      notices.push(notice);
    }
  }

  return notices;
}

module.exports = seoQuickChecker;
