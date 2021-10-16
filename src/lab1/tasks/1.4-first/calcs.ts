import math = require("mathjs");

export const contain = (mtx: number[][], elem: number[]) => {
  let result = false;
  for (let row = 0; row < mtx.length && !result; row++) {
    let isEqual = true;
    for (let i = 0; i < mtx[row].length && isEqual; i++) {
      isEqual = mtx[row][i] === elem[i];
    }
    result = isEqual;
  }
  return result;
};

export const areMatricesEqual = (mtx1: number[][], mtx2: number[][]) => {
  mtx1.forEach((value, index) => {
    if (contain(mtx2, value)) {
      return false;
    }
  });
  return true;
};

export const codesFromXorAllWords = (matrix: math.Matrix) => {
  const mtx = matrix.toArray();
  mtx.forEach((cur, index) =>
    mtx.slice(index + 1).forEach((next) => {
      const elem = math.bitXor(cur, next);
      if (!contain(mtx as number[][], elem)) {
        mtx.push(elem);
      }
    })
  );
  return math.matrix(mtx);
};

export const bitMultiply = (a, b) =>
  math.multiply(a, b).map((value) => math.mod(value, 2));

export const allWords = (k: number) =>
  [...Array(Math.pow(2, k) - 1)].map((_, index) => {
    const elem = ((index + 1) >>> 0)
      .toString(2)
      .split("")
      .map((value) => parseInt(value));
    while (elem.length < k) {
      elem.unshift(0);
    }
    return elem;
  }) as (0 | 1)[][];
