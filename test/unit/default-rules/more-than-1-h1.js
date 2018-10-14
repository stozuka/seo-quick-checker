'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { moreThan1H1 } = require('../../../lib/default-rules');

const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/count-tag',
);

describe('default-rules', () => {
  describe('more-than-1-h1', () => {
    it('should return the error message', async () => {
      const filePath = path.resolve(BASE_PATH, 'more-than-1-h1.html');
      const dom = await fromFile(filePath);
      const result = moreThan1H1(dom);
      expect(result).to.be.an('string');
    });

    it('should return null', async () => {
      const filePath = path.resolve(BASE_PATH, 'less-than-1-h1.html');
      const dom = await fromFile(filePath);
      const result = moreThan1H1(dom);
      expect(result).to.be.empty;
    });
  });
});
