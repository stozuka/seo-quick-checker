'use strict';

const { aMissingRel } = require('./a-missing-rel');
const { noMetaDescriptionInHead } = require('./no-meta-descripton-in-head');
const { noMetaKeywordsInHead } = require('./no-meta-keywords-in-head');
const { noTitleInHead } = require('./no-title-in-head');
const { imgMissingAlt } = require('./img-missing-alt');
const { moreThan1H1 } = require('./more-than-1-h1');
const { moreThan15Strong } = require('./more-than-15-strong');

module.exports = {
  aMissingRel,
  noMetaDescriptionInHead,
  noMetaKeywordsInHead,
  noTitleInHead,
  imgMissingAlt,
  moreThan1H1,
  moreThan15Strong,
  all: [
    aMissingRel,
    noMetaDescriptionInHead,
    noMetaKeywordsInHead,
    noTitleInHead,
    imgMissingAlt,
    moreThan1H1,
    moreThan15Strong,
  ],
};
