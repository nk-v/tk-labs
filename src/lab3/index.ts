import { bitMultiply } from "../lab1/tasks/1.4-first/calcs";
import { getRandomError } from "../lab1/tasks/1.5";
import { HammingCode, ExtendedHammingCode } from "./Hamming";

const r = 3;

const { G, H, n, k } = new ExtendedHammingCode(r);

console.table(H);
console.table(G);

const err = getRandomError(1, G[0].length);
const syndrome = bitMultiply(err, H);

const areEqual = (a, b) => JSON.stringify(a) == JSON.stringify(b);
