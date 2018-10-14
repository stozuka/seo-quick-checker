'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  it('find-missing-attr OK pattern: have span with class', async () => {
    const customRule = ruleBuilders.findMissingAttr('span', 'class');
    const filePath = path.resolve(BASE_PATH, 'find-missing-attr-ok.html');
    const dom = await getDom.fromFile(filePath);
    const notices = seoQuickChecker(dom, [customRule]);
    assert.equal(notices.length, 0);
  });

  it('find-missing-attr NG pattern: do not have span with class', async () => {
    const customRule = ruleBuilders.findMissingAttr('span', 'class');
    const filePath = path.resolve(BASE_PATH, 'find-missing-attr-ng.html');
    const dom = await getDom.fromFile(filePath);
    const notices = seoQuickChecker(dom, [customRule]);
    assert.equal(notices.length, 1);
  });
});
