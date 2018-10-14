'use strict';

const { countTag } = require('../rule-builders/count-tag');

function moreThan1H1(dom) {
  return countTag('h1', 1)(dom);
}

module.exports = { moreThan1H1 };
