'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  describe('tag-missing-attr', () => {
    it('should not have the notice when find missing attr is ok', async () => {
      const customRule = ruleBuilders.tagMissingAttr('span', 'class');
      const filePath = path.resolve(BASE_PATH, 'tag-missing-attr-ok.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 0);
    });

    it('should have the notice when missing attr is not ok', async () => {
      const customRule = ruleBuilders.tagMissingAttr('span', 'class');
      const filePath = path.resolve(BASE_PATH, 'tag-missing-attr-ng.html');
      const dom = await getDom.fromFile(filePath);
      const notices = seoQuickChecker(dom, [customRule]);
      assert.equal(notices.length, 1);
    });

    it('should throw an error when first argument is missing', () => {
      assert.throws(() => ruleBuilders.tagMissingAttr());
    });

    it('should throw an error when second argument is missing', () => {
      assert.throws(() => ruleBuilders.tagMissingAttr('span'));
    });
  });
});
