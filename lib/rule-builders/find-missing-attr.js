'use strict';

/**
 * @param {string} tag
 * @param {string} attr
 * @returns {Function}
 */
function findMissingAttr(tag, attr) {
  if (!tag || typeof tag !== 'string') {
    throw new Error('findMissingAttr: 1st argument <string> is required');
  }
  if (!attr || typeof attr !== 'string') {
    throw new Error('findMissingAttr: 2nd argument <string> is required');
  }

  return (dom) => {
    const tags = dom(tag);
    const totalCount = tags.length;

    let countTagWithAttr = 0;

    tags.each(function(_i, tag) {
      if (dom(tag).attr(attr)) {
        countTagWithAttr++;
      }
    });

    const diff = totalCount - countTagWithAttr;

    if (diff !== 0) {
      return `There are(is) ${diff} ${tag} without ${attr}.`;
    }

    return '';
  };
}

module.exports = { findMissingAttr };
