'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { headWithoutMetaKeywords } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/find-missing-tag',
);

describe('default-rules', () => {
  describe('head-without-meta-name', () => {
    it('should return the error message', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'head-without-meta-keywords.html',
      );
      const dom = await fromFile(filePath);
      const result = headWithoutMetaKeywords(dom);
      expect(result).to.be.an('string');
    });

    it('should return null when meta name exist', async () => {
      const filePath = path.resolve(BASE_PATH, 'head-with-meta-keywords.html');
      const dom = await fromFile(filePath);
      const result = headWithoutMetaKeywords(dom);
      expect(result).to.be.empty;
    });

    it('should return error message when meta name exists but not under head', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'meta-keywords-not-under-head.html',
      );
      const dom = await fromFile(filePath);
      const result = headWithoutMetaKeywords(dom);
      expect(result).to.be.an('string');
    });
  });
});
