'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  describe('tag-count-more-than', () => {
    it('should not have notice when count tag is ok', async () => {
      const customRule = ruleBuilders.tagCountMoreThan('h2', 1);
      const filePath = path.resolve(BASE_PATH, 'tag-count-more-than-ok.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 0);
    });

    it('should have a notice when count tag is not ok', async () => {
      const customRule = ruleBuilders.tagCountMoreThan('h2', 1);
      const filePath = path.resolve(BASE_PATH, 'tag-count-more-than-ng.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 1);
    });

    it('should throw an error when missing first argument', () => {
      assert.throws(() => ruleBuilders.tagCountMoreThan());
    });

    it('should throw an error when missing second argument', () => {
      assert.throws(() => ruleBuilders.tagCountMoreThan('h2'));
    });

    it('should throw an error when maxCount is less than 1', () => {
      assert.throws(() => ruleBuilders.tagCountMoreThan('h2', 0));
    });

    it('should throw an error when maxCount is negative', () => {
      assert.throws(() => ruleBuilders.tagCountMoreThan('h2', -1));
    });
  });
});
