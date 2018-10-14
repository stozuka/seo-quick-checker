'use strict';

const path = require('path');
const chai = require('chai');
const { fromFile } = require('../../../lib/get-dom');
const { aWithoutRel } = require('../../../lib/default-rules');

const assert = chai.assert;
const expect = chai.expect;
const BASE_PATH = path.resolve(
  __dirname,
  '../../fixtures/default-rules/find-missing-attr',
);

describe('default-rules', () => {
  describe('img-without-alt', () => {
    it('should return the notice when found img tag without alt attr', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-without-rel.html');
      const dom = await fromFile(filePath);
      const notice = aWithoutRel(dom);
      expect(notice).to.be.an('string');
    });

    it('should return the corrent number of notices', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-without-rel.html');
      const dom = await fromFile(filePath);
      // Notice: "There are(is) ${diff} ${tag} without ${attr}.""
      const notice = aWithoutRel(dom);
      const words = notice.split(' ');
      const number = parseInt(words[2]);
      assert.equal(number, 1);
    });

    it('should return empty string when all the img tags have alt attr', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-with-rel.html');
      const dom = await fromFile(filePath);
      const notice = aWithoutRel(dom);
      expect(notice).to.be.empty;
    });

    it('should return the notice when alt attr is empty', async () => {
      const filePath = path.resolve(BASE_PATH, 'a-with-empty-rel.html');
      const dom = await fromFile(filePath);
      const notice = aWithoutRel(dom);
      expect(notice).to.be.an('string');
    });
  });
});
