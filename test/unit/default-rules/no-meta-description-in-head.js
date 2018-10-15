'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { noMetaDescriptionInHead } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/tag-exists',
);

describe('default-rules', () => {
  describe('no-meta-description-in-head', () => {
    it('should return the notice when not found meta description', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'no-meta-description-in-head.html',
      );
      const dom = await fromFile(filePath);
      const notice = noMetaDescriptionInHead(dom);
      expect(notice).to.be.an('string');
    });

    it('should return empty string when found meta description', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'head-with-meta-description.html',
      );
      const dom = await fromFile(filePath);
      const notice = noMetaDescriptionInHead(dom);
      expect(notice).to.be.empty;
    });

    it('should return the notice when meta description exists but not under head', async () => {
      const filePath = path.resolve(
        BASE_PATH,
        'meta-description-not-under-head.html',
      );
      const dom = await fromFile(filePath);
      const notice = noMetaDescriptionInHead(dom);
      expect(notice).to.be.an('string');
    });
  });
});
