import { S } from "./input";
import { ref } from "./tasks/1.1/calcs";
import { BinaryMatrix, LinearCode } from "./tasks/1.3";
import {
  allWords,
  areMatricesEqual,
  bitMultiply,
  codesFromXorAllWords,
} from "./tasks/1.4-first/calcs";
import { showMatrix } from "./utils";

import { codeDistance, getAllErrors, getRandomError, getT } from "./tasks/1.5";
import math = require("mathjs");

//LinearCode
const linearCode = new LinearCode(S);
const { G, H, n, k } = linearCode;

//Code words
const firstMethod = codesFromXorAllWords(G);
const secondMethod = bitMultiply(allWords(k), G).toArray(),
  codes = secondMethod;

showMatrix(firstMethod, "Code words =");
console.log(
  "Are two methods equal? = ",
  areMatricesEqual(firstMethod.toArray() as BinaryMatrix, secondMethod)
);

showMatrix(bitMultiply(secondMethod, H), "[Code_Words] * G =");

//Checking errors
const d = codeDistance(firstMethod),
  t = getT(d);

console.log({ d, t });

const v = codes[Math.floor(Math.random() * (codes.length - 1))];
const e1 = getRandomError(t, n);
const res = bitMultiply(math.bitXor(v, e1), H);
console.table({ v, e1, res: res.toArray() });

const checkRes = (v: number[], e: number[], H) => {
  const sum = math.bitXor(v, e);
  return bitMultiply(sum, H);
};
const errors = getAllErrors(t + 1, n),
  checks = errors.map((e) => checkRes(v, e, H).toArray());

const errIndexies = [];

errors
  .map((e) => checkRes(v, e, H).toArray())
  .forEach((row: number[], currInd: number) => {
    if (row.every((x) => x === 0)) {
      errIndexies.push(currInd);
    }
  });

console.log("Синдромы");
console.table(errors.filter((_, ind) => errIndexies.includes(ind)));
console.log("Вектора результатов");
console.table(checks.filter((_, ind) => errIndexies.includes(ind)));
