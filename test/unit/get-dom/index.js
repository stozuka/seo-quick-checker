'use strict';

const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { fromFile, fromStream } = require('../../../lib/get-dom');

const assert = chai.assert;
const expect = chai.expect;
const BASE_PATH = path.resolve(__dirname, '../../fixtures/get-dom');

chai.use(chaiAsPromised);

describe('get-dom', () => {
  describe('from-file', function() {
    it('should return the dom from file', async () => {
      const filePath = path.resolve(BASE_PATH, 'index.html');
      const dom = await fromFile(filePath);
      const h1Text = dom('h1').text();
      assert.equal(h1Text, 'test');
    });

    it('should throw an error when filePath is missing', () => {
      expect(fromFile()).to.be.rejected;
    });
  });

  describe('from-stream', () => {
    it('should return the dom from stream', async () => {
      const filePath = path.resolve(BASE_PATH, 'index.html');
      const dom = await fromStream(filePath);
      const h1Text = dom('h1').text();
      assert.equal(h1Text, 'test');
    });

    it('should throw an error when filePath is missing', () => {
      assert.throws(() => fromStream());
    });
  });
});
