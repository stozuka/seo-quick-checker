'use strict';

function seoQuickChecker(dom, rules) {
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
