'use strict';

function findMissingTag(tag) {
  return (dom) => {
    const len = dom(tag).length;

    if (len === 0) {
      return `This HTML does not have ${tag} tag.`;
    }

    return '';
  };
}

module.exports = { findMissingTag };
