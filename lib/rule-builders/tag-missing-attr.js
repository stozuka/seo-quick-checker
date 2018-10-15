'use strict';

/**
 * @param {string} tag
 * @param {string} attr
 * @returns {Function}
 */
function tagMissingAttr(tag, attr) {
  if (!tag || typeof tag !== 'string') {
    throw new Error('tagMissingAttr: 1st argument <string> is required');
  }
  if (!attr || typeof attr !== 'string') {
    throw new Error('tagMissingAttr: 2nd argument <string> is required');
  }

  return (dom) => {
    const tags = dom(tag);
    const totalCount = tags.length;

    let tagCountMoreThanWithAttr = 0;

    tags.each(function(_i, tag) {
      if (dom(tag).attr(attr)) {
        tagCountMoreThanWithAttr++;
      }
    });

    const diff = totalCount - tagCountMoreThanWithAttr;

    if (diff !== 0) {
      return `There are(is) ${diff} ${tag} without ${attr}.`;
    }

    return '';
  };
}

module.exports = { tagMissingAttr };
