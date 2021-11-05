import { multiply } from "mathjs";

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
  //TODO
  const result = [];
  A.forEach((row, i) => {
    row.forEach((aij, j) => {});
  });
};
