'use strict';

// const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
// const { toConsole, toFile, toStream } = require('../../../lib/output');
const { toConsole } = require('../../../lib/output');

const expect = chai.expect;
const assert = chai.assert;

describe('output', () => {
  const notices = [
    'There are(is) 1 img without rel',
    'This HTML has more than 1 h1',
  ];
  const connector = '\n';
  const data = notices.join(connector);

  describe('to-console', () => {
    let spy;

    before(() => {
      spy = sinon.spy(console, 'log');
    });

    after(() => spy.restore());

    it('should console.log', async () => {
      toConsole(notices, connector);
      expect(spy.calledWith(data)).to.be.true;
    });

    it('should throw an error when missing first argument', () => {
      assert.throws(() => toConsole());
    });
  });

  // TODO: write this test
  describe.skip('to-file', () => {
    it('should write to a file', async () => {});
  });

  // TODO: write this test
  describe.skip('to-stream', () => {
    it('should write to stream', async () => {});
  });
});
