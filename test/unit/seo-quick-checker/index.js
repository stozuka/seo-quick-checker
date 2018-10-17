'use strict';

const path = require('path');
const chai = require('chai');
const { seoQuickChecker, defaultRules, getDom } = require('../../../lib');

const assert = chai.assert;
const expect = chai.expect;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/seo-quick-checker');
const DEFAULT_RULE_LENGTH = defaultRules.all.length;

describe('seo-quick-checker', () => {
  it('should return DEFAULT_RULE_LENGTH notices when all the default rules are NG', async () => {
    const filePath = path.resolve(BASE_PATH, 'all-ng.html');
    const dom = await getDom.fromFile(filePath);
    const rules = defaultRules.all;
    const notices = seoQuickChecker(dom, rules);
    assert.equal(notices.length, DEFAULT_RULE_LENGTH);
  });

  it('should return empty array when all the default rules are OK', async () => {
    const filePath = path.resolve(BASE_PATH, 'all-ok.html');
    const dom = await getDom.fromFile(filePath);
    const rules = defaultRules.all;
    const notices = seoQuickChecker(dom, rules);
    expect(notices).to.be.an('array').that.is.empty;
  });

  it('should throw an error when first argument is missing', () => {
    assert.throws(() => seoQuickChecker());
  });

  it('should throw an error when second argument is missing', async () => {
    const filePath = path.resolve(BASE_PATH, 'all-ok.html');
    const dom = await getDom.fromFile(filePath);
    assert.throws(() => seoQuickChecker(dom));
  });
});
