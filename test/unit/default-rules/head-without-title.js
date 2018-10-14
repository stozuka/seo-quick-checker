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
    it('should return the error message', async () => {
      const filePath = path.resolve(BASE_PATH, 'head-without-title.html');
      const dom = await fromFile(filePath);
      const result = headWithoutTitle(dom);
      expect(result).to.be.an('string');
    });

    it('should return null when title does not exist', async () => {
      const filePath = path.resolve(BASE_PATH, 'head-with-title.html');
      const dom = await fromFile(filePath);
      const result = headWithoutTitle(dom);
      expect(result).to.be.empty;
    });

    it('should return error message when title exists but not under head', async () => {
      const filePath = path.resolve(BASE_PATH, 'title-not-under-head.html');
      const dom = await fromFile(filePath);
      const result = headWithoutTitle(dom);
      expect(result).to.be.an('string');
    });
  });
});
