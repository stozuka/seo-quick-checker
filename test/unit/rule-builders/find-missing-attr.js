'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  describe('find-missing-attr', () => {
    it('should not have notice', async () => {
      const customRule = ruleBuilders.findMissingAttr('span', 'class');
      const filePath = path.resolve(BASE_PATH, 'find-missing-attr-ok.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 0);
    });

    it('should have a notice', async () => {
      const customRule = ruleBuilders.findMissingAttr('span', 'class');
      const filePath = path.resolve(BASE_PATH, 'find-missing-attr-ng.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 1);
    });

    it('should throw an error when missing first argument', () => {
      assert.throws(() => ruleBuilders.findMissingAttr());
    });

    it('should throw an error when missing second argument', () => {
      assert.throws(() => ruleBuilders.findMissingAttr('span'));
    });
  });
});
