// test/matrix.test.js
const { expect } = require('chai');
const M = require('../src/matrix');

describe('Matrix library (TDD demo)', function() {

  // RED: тест для додавання матриць (повинен впасти, якщо add не реалізовано)
  describe('add(A, B)', function() {
    it('adds two 2x2 matrices', function() {
      const A = [[1,2],[3,4]];
      const B = [[5,6],[7,8]];
      //const C = M.add(A, B);
      expect(C).to.deep.equal([[6,8],[10,12]]);
    });

    it('throws on different shapes', function() {
      const A = [[1,2],[3,4]];
      const B = [[1,2,3]];
      expect(() => M.add(A,B)).to.throw();
    });
  });

  // RED: тест для множення матриць
  describe('multiply(A, B)', function() {
    it('multiplies 2x2 matrices', function() {
      const A = [[1,2],[3,4]];
      const B = [[2,0],[1,2]];
      const C = M.multiply(A,B);
      // manual multiply:
      // [1*2+2*1, 1*0+2*2] = [4,4]
      // [3*2+4*1, 3*0+4*2] = [10,8]
      expect(C).to.deep.equal([[4,4],[10,8]]);
    });

    it('supports scalar multiplication', function() {
      const A = [[1,2],[3,4]];
      expect(M.multiply(A, 2)).to.deep.equal([[2,4],[6,8]]);
    });

    it('throws on incompatible dims', function() {
      const A = [[1,2,3]];
      const B = [[1,2],[3,4]];
      expect(() => M.multiply(A,B)).to.throw();
    });
  });

  // RED: тест для транспонування
  describe('transpose(A)', function() {
    it('transposes a 2x3 matrix', function() {
      const A = [[1,2,3],[4,5,6]];
      expect(M.transpose(A)).to.deep.equal([[1,4],[2,5],[3,6]]);
    });
  });

  // Determinant tests
  describe('determinant(A)', function() {
    it('computes 1x1 determinant', function() {
      expect(M.determinant([[5]])).to.equal(5);
    });

    it('computes 2x2 determinant', function() {
      expect(M.determinant([[1,2],[3,4]])).to.equal(1*4 - 2*3); // -2
    });

    it('computes 3x3 determinant', function() {
      const A = [[6,1,1],[4,-2,5],[2,8,7]];
      // known det = -306 (calculator/manual)
      expect(M.determinant(A)).to.equal(-306);
    });
  });

  describe('equals(A,B)', function() {
    it('compares matrices with tolerance', function() {
      const A = [[1.0000000001, 2],[3,4]];
      const B = [[1.0000000002, 2],[3,4]];
      expect(M.equals(A,B)).to.be.true;
    });
    it('returns false for different shapes', function() {
      expect(M.equals([[1]], [[1,2]])).to.be.false;
    });
  });

});
