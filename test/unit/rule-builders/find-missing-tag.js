'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  describe('find-missing-tag', () => {
    it('should not have notice', async () => {
      const customRule = ruleBuilders.findMissingTag('head meta[name=robots]');
      const filePath = path.resolve(BASE_PATH, 'find-missing-tag-ok.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 0);
    });

    it('should have a notice', async () => {
      const customRule = ruleBuilders.findMissingTag('head meta[name=robots]');
      const filePath = path.resolve(BASE_PATH, 'find-missing-tag-ng.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 1);
    });
  });
});
