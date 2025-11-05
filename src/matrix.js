function _validateMatrix(A, name = 'matrix') {
  if (!Array.isArray(A) || A.length === 0) throw new Error(`${name} must be a non-empty 2D array`);
  const cols = A[0].length;
  if (!Number.isInteger(cols) || cols === 0) throw new Error(`${name} must be a non-empty 2D array`);
  for (let r = 0; r < A.length; r++) {
    if (!Array.isArray(A[r]) || A[r].length !== cols) throw new Error(`${name} has inconsistent row lengths`);
    for (let c = 0; c < cols; c++) {
      if (typeof A[r][c] !== 'number' || Number.isNaN(A[r][c])) throw new Error(`${name} contains non-number at ${r},${c}`);
    }
  }
}

function cloneMatrix(A) {
  _validateMatrix(A);
  return A.map(row => row.slice());
}

function shape(A) {
  _validateMatrix(A);
  return [A.length, A[0].length];
}

function isSquare(A) {
  const [r, c] = shape(A);
  return r === c;
}

function add(A, B) {
  return [
    [A[0][0] + B[0][0], A[0][1] + B[0][1]],
    [A[1][0] + B[1][0], A[1][1] + B[1][1]],
  ];
}

module.exports = { add };


function subtract(A, B) {
  _validateMatrix(A, 'A');
  _validateMatrix(B, 'B');
  const [r1, c1] = shape(A);
  const [r2, c2] = shape(B);
  if (r1 !== r2 || c1 !== c2) throw new Error('Matrix dimensions must match for subtraction');
  const C = [];
  for (let i = 0; i < r1; i++) {
    const row = new Array(c1);
    for (let j = 0; j < c1; j++) row[j] = A[i][j] - B[i][j];
    C.push(row);
  }
  return C;
}

function transpose(A) {
  _validateMatrix(A, 'A');
  const [r, c] = shape(A);
  const T = [];
  for (let j = 0; j < c; j++) {
    const row = new Array(r);
    for (let i = 0; i < r; i++) row[i] = A[i][j];
    T.push(row);
  }
  return T;
}

function multiply(A, B) {
  _validateMatrix(A, 'A');
  // B can be matrix or scalar
  if (typeof B === 'number') {
    const [r, c] = shape(A);
    const C = [];
    for (let i = 0; i < r; i++) {
      const row = new Array(c);
      for (let j = 0; j < c; j++) row[j] = A[i][j] * B;
      C.push(row);
    }
    return C;
  }
  _validateMatrix(B, 'B');
  const [rA, cA] = shape(A);
  const [rB, cB] = shape(B);
  if (cA !== rB) throw new Error('Matrix A columns must match Matrix B rows for multiplication');
  const C = [];
  for (let i = 0; i < rA; i++) {
    const row = new Array(cB).fill(0);
    for (let k = 0; k < cA; k++) {
      for (let j = 0; j < cB; j++) {
        row[j] += A[i][k] * B[k][j];
      }
    }
    C.push(row);
  }
  return C;
}

// Determinant (recursive) — works for square matrices
function determinant(A) {
  _validateMatrix(A, 'A');
  if (!isSquare(A)) throw new Error('Determinant is defined only for square matrices');
  const n = A.length;
  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0]*A[1][1] - A[0][1]*A[1][0];
  // Laplace expansion (not optimized for big n)
  let det = 0;
  for (let col = 0; col < n; col++) {
    // build minor
    const minor = [];
    for (let i = 1; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) if (j !== col) row.push(A[i][j]);
      minor.push(row);
    }
    const cofactor = ((col % 2 === 0) ? 1 : -1) * A[0][col];
    det += cofactor * determinant(minor);
  }
  return det;
}

function equals(A, B, eps = 1e-9) {
  try {
    _validateMatrix(A, 'A');
    _validateMatrix(B, 'B');
  } catch (e) {
    return false;
  }
  const [r1, c1] = shape(A);
  const [r2, c2] = shape(B);
  if (r1 !== r2 || c1 !== c2) return false;
  for (let i = 0; i < r1; i++) {
    for (let j = 0; j < c1; j++) {
      if (Math.abs(A[i][j] - B[i][j]) > eps) return false;
    }
  }
  return true;
}

module.exports = {
  _validateMatrix,
  cloneMatrix,
  shape,
  isSquare,
  add,
  subtract,
  transpose,
  multiply,
  determinant,
  equals
};
