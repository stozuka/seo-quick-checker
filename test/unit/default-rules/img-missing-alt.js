'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { imgMissingAlt } = require('../../../lib/default-rules');

const assert = chai.assert;
const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/tag-missing-attr',
);

describe('default-rules', () => {
  describe('img-missing-alt', () => {
    it('should return the notice when img without alt found', async () => {
      const filePath = path.resolve(BASE_PATH, 'img-missing-alt.html');
      const dom = await fromFile(filePath);
      const notice = imgMissingAlt(dom);
      expect(notice).to.not.be.empty;
    });

    it('should return the corrent number of notices', async () => {
      const filePath = path.resolve(BASE_PATH, 'img-missing-alt.html');
      const dom = await fromFile(filePath);
      // notice: "There are(is) ${diff} ${tag} without ${attr}.""
      const notice = imgMissingAlt(dom);
      const words = notice.split(' ');
      const number = parseInt(words[2]); // ${diff} is the number to check
      assert.equal(number, 1);
    });

    it('should return empty string when img without alt not found', async () => {
      const filePath = path.resolve(BASE_PATH, 'img-with-alt.html');
      const dom = await fromFile(filePath);
      const notice = imgMissingAlt(dom);
      expect(notice).to.be.empty;
    });

    it('should return the notice when alt is empty string', async () => {
      const filePath = path.resolve(BASE_PATH, 'img-with-empty-alt.html');
      const dom = await fromFile(filePath);
      const notice = imgMissingAlt(dom);
      expect(notice).to.not.be.empty;
    });
  });
});
