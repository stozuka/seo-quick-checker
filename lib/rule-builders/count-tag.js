'use strict';

function countTag(tag, maxCount) {
  return (dom) => {
    const count = dom(tag).length;

    if (count > maxCount) {
      return `This HTML has more than ${maxCount} ${tag}.`;
    }

    return '';
  };
}

module.exports = { countTag };
