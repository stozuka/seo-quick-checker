'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { noTitleInHead } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/tag-exists',
);

describe('default-rules', () => {
  describe('no-title-in-head', () => {
    it('should return the notice when title not found', async () => {
      const filePath = path.resolve(BASE_PATH, 'no-title-in-head.html');
      const dom = await fromFile(filePath);
      const notice = noTitleInHead(dom);
      expect(notice).to.not.be.empty;
    });

    it('should return empty string when title found', async () => {
      const filePath = path.resolve(BASE_PATH, 'head-with-title.html');
      const dom = await fromFile(filePath);
      const notice = noTitleInHead(dom);
      expect(notice).to.be.empty;
    });

    it('should return the notice when title exists but not under head', async () => {
      const filePath = path.resolve(BASE_PATH, 'title-not-under-head.html');
      const dom = await fromFile(filePath);
      const notice = noTitleInHead(dom);
      expect(notice).to.not.be.empty;
    });
  });
});
