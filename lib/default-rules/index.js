'use strict';

const { aWithoutRel } = require('./a-without-rel');
const {
  headWithoutMetaDescription,
} = require('./head-without-meta-description');
const { headWithoutMetaKeywords } = require('./head-without-meta-keywords');
const { headWithoutTitle } = require('./head-without-title');
const { imgWithoutAlt } = require('./img-without-alt');
const { moreThan1H1 } = require('./more-than-1-h1');
const { moreThan15Strong } = require('./more-than-15-strong');

module.exports = {
  aWithoutRel,
  headWithoutMetaDescription,
  headWithoutMetaKeywords,
  headWithoutTitle,
  imgWithoutAlt,
  moreThan1H1,
  moreThan15Strong,
  all: [
    aWithoutRel,
    headWithoutMetaDescription,
    headWithoutMetaKeywords,
    headWithoutTitle,
    imgWithoutAlt,
    moreThan1H1,
    moreThan15Strong,
  ],
};
