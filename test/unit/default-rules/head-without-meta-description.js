'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { headWithoutMetaDescription } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/find-missing-tag',
);

describe('default-rules', () => {
  describe('head-without-meta-description', () => {
    it('should return the error message', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'head-without-meta-description.html',
      );
      const dom = await fromFile(filePath);
      const result = headWithoutMetaDescription(dom);
      expect(result).to.be.an('string');
    });

    it('should return null when meta description exists', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'head-with-meta-description.html',
      );
      const dom = await fromFile(filePath);
      const result = headWithoutMetaDescription(dom);
      expect(result).to.be.empty;
    });

    it('should return error message when meta description exists but not under head', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'meta-description-not-under-head.html',
      );
      const dom = await fromFile(filePath);
      const result = headWithoutMetaDescription(dom);
      expect(result).to.be.an('string');
    });
  });
});
