'use strict';

const fs = require('fs');
const mock = require('mock-fs');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { toConsoleLog, toFile, toStream } = require('../../../lib/output');

const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiAsPromised);

describe('output', () => {
  const notices = [
    'There are(is) 1 img without rel',
    'This HTML has more than 1 h1',
  ];
  const connector = '\n';

  describe('to-console', () => {
    let spy;

    before(() => {
      spy = sinon.spy(console, 'log');
    });

    after(() => spy.restore());

    it('should console.log', async () => {
      toConsoleLog(notices, connector);
      expect(spy.calledWith(notices.join(connector))).to.be.true;
    });

    it('should throw an error when missing first argument', () => {
      assert.throws(() => toConsoleLog());
    });
  });

  describe('to-file', () => {
    const filePath = 'output.txt';

    beforeEach(() => mock({}));

    afterEach(() => mock.restore());

    it('should write to a file', async () => {
      const data = notices.join(connector);
      await toFile(filePath, notices, connector);
      const writtenData = fs.readFileSync(filePath);
      assert.equal(writtenData, data);
    });

    it('should throw an error when missing first argument', () => {
      expect(toFile()).to.be.rejected;
    });

    it('should throw an error when missing second argument', () => {
      expect(toFile(filePath)).to.be.rejected;
    });
  });

  describe('to-stream', () => {
    const filePath = 'output.txt';
    const encoding = 'utf8';

    beforeEach(() => mock({}));

    afterEach(() => mock.restore());

    it('should write to stream', async () => {
      const data = notices.join(connector);
      const ws = fs.createWriteStream(filePath, encoding);
      await toStream(ws, notices);
      const writtenData = fs.readFileSync(filePath);
      assert.equal(writtenData, data);
    });

    it('should throw an error when missing first argument', () => {
      expect(toStream()).to.be.rejected;
    });

    it('should throw an error when missing second argument', () => {
      const ws = fs.createWriteStream(filePath, encoding);
      expect(toStream(ws)).to.be.rejected;
    });
  });
});
