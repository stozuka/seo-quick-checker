'use strict';

/**
 * @param {string} tag
 * @param {number} maxCount - maxCount is inclusive. So, if maxCount is 15 and
 *     the number of tag was 15, it's OK.
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
      'tagCountMoreThan: 2nd argument must be natural <number> which is greater than 0',
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
