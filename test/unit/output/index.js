'use strict';

// const path = require('path');
const chai = require('chai');
const sinon = require('sinon');
// const { toConsole, toFile, toStream } = require('../../../lib/output');
const { toConsole } = require('../../../lib/output');

const expect = chai.expect;
// const assert = chai.assert;

describe('output', () => {
  const messages = [
    'There are(is) 1 img without rel',
    'This HTML has more than 1 h1',
  ];
  const connector = '\n';
  const data = messages.join(connector);

  describe('to-console', () => {
    let spy;

    before(() => {
      spy = sinon.spy(console, 'log');
    });

    after(() => spy.restore());

    it('should console.log', async () => {
      toConsole(messages, connector);
      expect(spy.calledWith(data)).to.be.true;
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
