'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom/');
const { headWithoutTitle } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/find-missing-tag',
);

describe('default-rules', () => {
  describe('head-without-title', () => {
    it('should return the notice when title not found', async () => {
      const filePath = path.resolve(BASE_PATH, 'head-without-title.html');
      const dom = await fromFile(filePath);
      const notice = headWithoutTitle(dom);
      expect(notice).to.be.an('string');
    });

    it('should return empty string when title found', async () => {
      const filePath = path.resolve(BASE_PATH, 'head-with-title.html');
      const dom = await fromFile(filePath);
      const notice = headWithoutTitle(dom);
      expect(notice).to.be.empty;
    });

    it('should return the notice when title found but not under head', async () => {
      const filePath = path.resolve(BASE_PATH, 'title-not-under-head.html');
      const dom = await fromFile(filePath);
      const notice = headWithoutTitle(dom);
      expect(notice).to.be.an('string');
    });
  });
});
