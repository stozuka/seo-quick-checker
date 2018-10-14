'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { imgWithoutAlt } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/find-missing-attr',
);

describe('default-rules', () => {
  describe('img-without-alt', () => {
    it('should return the error message', async () => {
      const filePath = path.resolve(BASE_PATH, 'img-without-alt.html');
      const dom = await fromFile(filePath);
      const result = imgWithoutAlt(dom);
      expect(result).to.be.an('string');
    });

    it('should return null when all the img tags have alt attr', async () => {
      const filePath = path.resolve(BASE_PATH, 'img-with-alt.html');
      const dom = await fromFile(filePath);
      const result = imgWithoutAlt(dom);
      expect(result).to.be.empty;
    });

    it('should return message when alt is empty string', async () => {
      const filePath = path.resolve(BASE_PATH, 'img-with-empty-alt.html');
      const dom = await fromFile(filePath);
      const result = imgWithoutAlt(dom);
      expect(result).to.be.an('string');
    });
  });
});
