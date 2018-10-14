'use strict';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const { fromFile, fromStream } = require('../../../lib/get-dom');

const assert = chai.assert;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/get-dom');

describe('get-dom', () => {
  describe('from-file', function() {
    it('should return the dom from file', async () => {
      const filePath = path.resolve(BASE_PATH, 'index.html');
      const dom = await fromFile(filePath);
      const h1Text = dom('h1').text();
      assert.equal(h1Text, 'test');
    });
  });

  describe('from-stream', () => {
    it('should return the dom from stream', async () => {
      const filePath = path.resolve(BASE_PATH, 'index.html');
      const rs = fs.createReadStream(filePath, 'utf8');
      const dom = await fromStream(rs);
      const h1Text = dom('h1').text();
      assert.equal(h1Text, 'test');
    });
  });
});
