'use strict';

const { countTag } = require('../rule-builders/count-tag');

function moreThan15Strong(dom) {
  return countTag('strong', 15)(dom);
}

module.exports = { moreThan15Strong };
