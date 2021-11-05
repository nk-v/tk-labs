import { multiply, pow } from "mathjs";

export const getI = (length: number): number[][] =>
  Array.from({ length }, (_, ind) =>
    Array.from({ length }, (_, k) => (ind === k ? 1 : 0))
  );

export const getRandomRow = (length: number) =>
  Array.from({ length }, () => (Math.random() <= 0.5 ? 0 : 1));

export const getRandomError = (t: number, n: number) => {
  if (t >= n) {
    return Array.from({ length: n }, (_) => 1);
  }

  const v = Array.from({ length: n }, (_) => 0);
  const emptyIndexes = Array.from({ length: n }, (_, ind) => ind);

  for (let i = 0; i < t; i++) {
    const rnd =
      Math.floor(Math.random() * emptyIndexes.length) % emptyIndexes.length;
    v[emptyIndexes[rnd]] = 1;

    emptyIndexes.splice(rnd, 1);
  }

  return v;
};

export const getWeight = (row: number[]) =>
  row.reduce((acc, curr) => acc + curr, 0);

export const kronekerMultiply = (A: number[][], B: number[][]) => {
  const bHeight = B.length;
  const bWidth = B[0].length;

  const result = Array.from({ length: A.length * B.length }, (_) =>
    Array.from({ length: A[0].length * B[0].length }, (_) => 0)
  );

  for (let rowInd = 0; rowInd < result.length; rowInd++) {
    for (let colInd = 0; colInd < result[rowInd].length; colInd++) {
      result[rowInd][colInd] =
        A[Math.floor(rowInd / bHeight)][Math.floor(colInd / bWidth)] *
        B[rowInd % bHeight][colInd % bWidth];
    }
  }

  return result;
};

const H = [
  [1, 1],
  [1, -1],
];

const I_2_m = (m: number) => getI(pow(2, m) as number);

export const H_m_i = (m: number, i: number) =>
  kronekerMultiply(kronekerMultiply(I_2_m(m - i), H), I_2_m(i - 1));
