'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  describe('tag-exists', () => {
    it('should not have the notice when find missing tag is ok', async () => {
      const customRule = ruleBuilders.tagExists('head meta[name=robots]');
      const filePath = path.resolve(BASE_PATH, 'tag-exists-ok.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 0);
    });

    it('should have the notice when find missing tag is not ok', async () => {
      const customRule = ruleBuilders.tagExists('head meta[name=robots]');
      const filePath = path.resolve(BASE_PATH, 'tag-exists-ng.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 1);
    });

    it('should throw an error when first argument is missing', () => {
      assert.throws(() => ruleBuilders.tagExists());
    });
  });
});
