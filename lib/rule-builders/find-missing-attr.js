'use strict';

function findMissingAttr(tag, attr) {
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
