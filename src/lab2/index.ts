import { getAllErrors, getRandomError } from "../lab1/tasks/1.5";
import { bitMultiply } from "../lab1/tasks/1.4-first/calcs";
import { bitXor, index } from "mathjs";
import math = require("mathjs");

export const getI = (length: number) =>
  Array.from({ length }, (_, ind) =>
    Array.from({ length }, (_, k) => (ind === k ? 1 : 0))
  );

const getRandomRow = (length: number) =>
  Array.from({ length }, () => (Math.random() <= 0.5 ? 0 : 1));

const findRowIndex = (M, x) =>
  M.findIndex((row) => {
    let equal = true;
    for (let i = 0; i < row.length && equal; i++) {
      equal = row[i] === x[i];
    }
    return equal;
  });

const solve = (n: number, k: number, d: number, maxErr: number) => {
  const _X = [];
  for (let i = 0; i < k; i++) {
    let newRow = "";
    do {
      let row = getRandomRow(n - k);
      let numberOfUnits = row.reduce((sum, curr) => sum + curr, 0);

      while (numberOfUnits++ < d - 1) {
        row[row.findIndex((val) => val === 0)] = 1;
      }
      newRow = row.join("");
    } while (_X.includes(newRow));
    _X.push(newRow);
  }

  const X = _X.map((row: string) => row.split("").map((char) => Number(char)));
  X.forEach((row) => {
    let numberOfUnits = row.reduce((sum, curr) => sum + curr, 0);

    while (numberOfUnits++ < d - 1) {
      row[row.findIndex((val) => val === 0)] = 1;
    }
  });

  const I = getI(k);
  const G = I.map((row, ind) => [...row, ...X[ind]]);
  const H = [...X, ...getI(n - k)];

  console.log("X =");
  console.table(X);
  console.log("G =");
  console.table(G);
  console.log("H =");
  console.table(H);

  // for (let err = 1; err <= maxErr; err++) {
  console
    .log
    // "=============== Error multiplicity " + maxErr + " ==============="
    ();
  // const errors_1 = getAllErrors(1, n);

  // console.log("ErrsSyndromes 1 :");
  // console.table(bitMultiply(errors_1, H));

  console.log("ErrsSyndromes 2 :");
  const errors_2 = getAllErrors(2, n);
  console.table(bitMultiply(errors_2, H));
  const randomErr = errors_2[Math.floor(Math.random() * errors_2.length)];
  console.table({ randomErr, randomSyndrome: bitMultiply(randomErr, H) });

  // const word = getRandomRow(k);
  // const encodedWord = bitMultiply(word, G);

  // const randomError = errors[Math.floor(Math.random() * errors.length)];
  // let wrongWord = bitXor(encodedWord, randomError);

  // console.table("Data = ");
  // console.table({ word });
  // console.table({ encodedWord, randomError, wrongWord });

  // let step = 0;
  // const TOTAL_STEPS = err;
  // while (++step <= TOTAL_STEPS) {
  //   console.log("Step :: " + step);

  //   const syndrome = bitMultiply(wrongWord, H);
  //   const foundStringIndex = findRowIndex(H, syndrome);
  //   console.table({ syndrome, foundStringIndex });

  //   if (foundStringIndex < 0) {
  //     console.log("No syndrome in H");
  //     console.table({ encodedWord, finalWord: wrongWord });
  //     return;
  //   }

  //   const vec = Array.from({ length: n }, () => 0);
  //   vec[foundStringIndex] = 1;

  //   const checkWord = bitXor(wrongWord, vec);
  //   const areEqual =
  //     JSON.stringify(checkWord) === JSON.stringify(encodedWord);

  //   console.table({ wrongWord, vec });
  //   console.table({ checkWord, encodedWord, areEqual });

  //   wrongWord = checkWord;
  // }
  // }
};

/**
 * G =
┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ (index) │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │
├─────────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│    0    │ 1 │ 0 │ 0 │ 1 │ 1 │ 1 │ 0 │ 1 │ 0 │ 0 │
│    1    │ 0 │ 1 │ 0 │ 1 │ 1 │ 1 │ 1 │ 0 │ 0 │ 0 │
│    2    │ 0 │ 0 │ 1 │ 1 │ 1 │ 0 │ 0 │ 1 │ 1 │ 1 │
└─────────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
 */

// const G = [
//   [1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
//   [0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
//   [0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
//   [0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
// ];

const func = () => {
  const n = 10,
    k = 4;

  const X = [
    [0, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1],
  ];

  const I = getI(k);
  const G = I.map((row, ind) => [...row, ...X[ind]]);
  const H = [...X, ...getI(n - k)];

  console.log("G = ");
  console.table(G);

  console.log("H = ");
  console.table(H);

  const multiplicity = 3;

  const randomErr = getRandomError(multiplicity, n);
  const syndrome = bitMultiply(randomErr, H);
  const indexes = findHIndexes(syndrome, H, multiplicity);

  const correctVec = Array.from({ length: n }, (_, k) =>
    indexes.includes(k) ? 1 : 0
  );
  console.table({ randomErr, syndrome, indexes, correctVec });
};

const findHIndexes = (
  vec: number[],
  H: number[][],
  multiplicity: number
): number[] => {
  let res = [-1, -1];
  H.forEach((row, index) => {
    if (areEqual(row, vec)) {
      res = [index];
    }
    if (multiplicity !== 1) {
      H.slice(index + 1).forEach((rowAfter, indexAfter) => {
        if (areEqual(bitXor(row, rowAfter), vec)) {
          res = [index, indexAfter + index + 1];
        }
      });
    }
  });
  return res;
};

const areEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

func();

// solve(10, 3, 5, 2);
