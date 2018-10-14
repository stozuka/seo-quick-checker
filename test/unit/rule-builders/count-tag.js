'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, getDom, ruleBuilders } = require('../../../lib');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/rule-builders');

describe('rule-builders', () => {
  it('count-tag OK pattern: not more than 1 h2 tag', async () => {
    const customRule = ruleBuilders.countTag('h2', 1);
    const filePath = path.resolve(BASE_PATH, 'count-tag-ok.html');
    const dom = await getDom.fromFile(filePath);
    const notices = seoQuickChecker(dom, [customRule]);
    assert.equal(notices.length, 0);
  });

  it('count-tag NG pattern: more than 1 h2 tag', async () => {
    const customRule = ruleBuilders.countTag('h2', 1);
    const filePath = path.resolve(BASE_PATH, 'count-tag-ng.html');
    const dom = await getDom.fromFile(filePath);
    const notices = seoQuickChecker(dom, [customRule]);
    assert.equal(notices.length, 1);
  });
});
