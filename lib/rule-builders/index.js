'use strict';

const { tagMissingAttr } = require('./tag-missing-attr');
const { tagCountMoreThan } = require('./tag-count-more-than');
const { tagExists } = require('./tag-exists');

module.exports = {
  tagMissingAttr,
  tagCountMoreThan,
  tagExists,
};
