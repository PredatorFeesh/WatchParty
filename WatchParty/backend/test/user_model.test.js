const { expect } = require('chai')

// Dummy test
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect([1, 2, 3].indexOf(4)).equal(-1);
    });
  });
});

