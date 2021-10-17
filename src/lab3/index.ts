import { bitMultiply } from "../lab1/tasks/1.4-first/calcs";
import { getRandomError } from "../lab1/tasks/1.5";
import { HammingCode, ExtendedHammingCode } from "./Hamming";

const r = 3;

const { G, H } = new ExtendedHammingCode(r);

console.log("H = ");
console.table(H);
// console.table(G);

const err = getRandomError(3, G[0].length);
const syndrome = bitMultiply(err, H);

let foundIndex = undefined;
H.forEach((row, index) => {
  if (JSON.stringify(row) === JSON.stringify(syndrome)) {
    foundIndex = index;
    return;
  }
});

console.table({ err, syndrome, index: foundIndex ?? "Not found" });
