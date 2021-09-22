import * as math from "mathjs";
import {
  allWords,
  areMatricesEqual,
  bitMultiply,
  codesFromXorAllWords,
  contain,
} from "./calcs";
import { G, H } from "./mocks";

const u = [1, 0, 1, 1, 0];
const v = bitMultiply(u, G);

const firstMethod = codesFromXorAllWords(G).toArray();
const secondMethod = bitMultiply(allWords(5), G).toArray();

console.log(areMatricesEqual(firstMethod as number[][], secondMethod));
console.table(bitMultiply(firstMethod, H).toArray());
