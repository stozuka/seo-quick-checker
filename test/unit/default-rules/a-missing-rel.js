'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { aMissingRel } = require('../../../lib/default-rules');

const assert = chai.assert;
const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/tag-missing-attr',
);

describe('default-rules', () => {
  describe('img-missing-alt', () => {
    it('should return the notice when found img tag without alt attr', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-missing-rel.html');
      const dom = await fromFile(filePath);
      const notice = aMissingRel(dom);
      expect(notice).to.not.be.empty;
    });

    it('should return the corrent number of notices', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-missing-rel.html');
      const dom = await fromFile(filePath);
      // notice: "There are(is) ${diff} ${tag} without ${attr}.""
      const notice = aMissingRel(dom);
      const words = notice.split(' ');
      const number = parseInt(words[2]); // ${diff} is the number to check
      assert.equal(number, 1);
    });

    it('should return empty string when all the img tags have alt attr', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-with-rel.html');
      const dom = await fromFile(filePath);
      const notice = aMissingRel(dom);
      expect(notice).to.be.empty;
    });

    it('should return the notice when alt attr is empty', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-with-empty-rel.html');
      const dom = await fromFile(filePath);
      const notice = aMissingRel(dom);
      expect(notice).to.not.be.empty;
    });
  });
});
