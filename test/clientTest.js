import { expect } from 'chai';
import 'mocha';

const someFunc = () => 'expectedOutcome';
describe('someFuncType', () => {
  describe('someFunc', () => {
    it('should do some functiony stuff', () => {
      const input1 = 'input1';
      const input2 = 'input2';
      const expectedOutcome = 'expectedOutcome';

      expect(someFunc(input1, input2)).to.deep.equal(expectedOutcome);
    });

    it('should create \'some\' property of \'test\' object if not already existing', () => {
      const test = {};
      const input1 = 'i1';
      const input2 = 'i2';
      someFunc(input1, input2);

      expect(test.some).to.be.ok;
    });
  });
});

