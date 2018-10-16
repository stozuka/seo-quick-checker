'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { noMetaKeywordsInHead } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/tag-exists',
);

describe('default-rules', () => {
  describe('no-meta-keywords-in-head', () => {
    it('should return the notice when meta keywords not found', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'no-meta-description-in-head.html',
      );
      const dom = await fromFile(filePath);
      const notice = noMetaKeywordsInHead(dom);
      expect(notice).to.not.be.empty;
    });

    it('should return empty string when meta keywords found', async () => {
      const filePath = path.resolve(BASE_PATH, 'head-with-meta-keywords.html');
      const dom = await fromFile(filePath);
      const notice = noMetaKeywordsInHead(dom);
      expect(notice).to.be.empty;
    });

    it('should return the notice when meta keywords exists but not under head', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'meta-keywords-not-under-head.html',
      );
      const dom = await fromFile(filePath);
      const notice = noMetaKeywordsInHead(dom);
      expect(notice).to.not.be.empty;
    });
  });
});
