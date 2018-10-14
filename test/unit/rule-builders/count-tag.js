'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  describe('count-tag', () => {
    it('should not have notice', async () => {
      const customRule = ruleBuilders.countTag('h2', 1);
      const filePath = path.resolve(BASE_PATH, 'count-tag-ok.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 0);
    });

    it('should have a notice', async () => {
      const customRule = ruleBuilders.countTag('h2', 1);
      const filePath = path.resolve(BASE_PATH, 'count-tag-ng.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 1);
    });

    it('should throw an error when missing first argument', async () => {
      assert.throws(() => ruleBuilders.countTag());
    });

    it('should throw an error when missing second argument', async () => {
      assert.throws(() => ruleBuilders.countTag('h2'));
    });

    it('should throw an error when maxCount is less than 1', async () => {
      assert.throws(() => ruleBuilders.countTag('h2', 0));
    });

    it('should throw an error when maxCount is negative', async () => {
      assert.throws(() => ruleBuilders.countTag('h2', -1));
    });
  });
});
