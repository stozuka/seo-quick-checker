'use strict';

/**
 * @param {string} tag
 * @param {number} maxCount
 * @returns {Function}
 */
function tagCountMoreThan(tag, maxCount) {
  if (!tag || typeof tag !== 'string') {
    throw new Error('tagCountMoreThan: 1st argument <string> is required');
  }
  const parsedMaxCount = parseInt(maxCount);
  if (
    !parsedMaxCount ||
    typeof parsedMaxCount !== 'number' ||
    parsedMaxCount <= 0
  ) {
    throw new Error(
      'tagCountMoreThan: 2nd argument must be <integer> which is greater than 0',
    );
  }

  return (dom) => {
    const count = dom(tag).length;

    if (count > parsedMaxCount) {
      return `This HTML has more than ${parsedMaxCount} ${tag}.`;
    }

    return '';
  };
}

module.exports = { tagCountMoreThan };
