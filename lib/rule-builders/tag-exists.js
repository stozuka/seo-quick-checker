'use strict';

/**
 * @param {string} tag
 * @returns {Function}
 */
function tagExists(tag) {
  if (!tag || typeof tag !== 'string') {
    throw new Error('tagExists: 1st argument <string> is required');
  }

  return (dom) => {
    const len = dom(tag).length;

    if (len === 0) {
      return `This HTML does not have ${tag} tag.`;
    }

    return '';
  };
}

module.exports = { tagExists };
