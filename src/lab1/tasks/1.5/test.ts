import * as math from "mathjs";
import { bitMultiply, codesFromXorAllWords } from "../1.4-first/calcs";
import {codeDistance, getAllErrors, getRandomError, getT} from "./index";
import { G, H } from "./mocks";

const codes = codesFromXorAllWords(G);
const d = codeDistance(codes);
const t = getT(d);
const n = 10;

console.log({d, t});

const err = getRandomError(t, n);
const sum = math.bitXor(err, codes.toArray()[1]);
const mult = bitMultiply(sum, H);

// console.table({err, v: codes.toArray()[1], vWithErr: sum, result: mult.toArray()});

const checkRes = (v: number[], e: number[], H) => {
    const sum = math.bitXor(v, e);
    return bitMultiply(sum, H);
}

const v = codes.toArray()[1] as number[];
const errors = getAllErrors(t + 1, n);
const checks = errors.map(e => checkRes(v, e, H).toArray());

const errIndexies = [];
checks.forEach((row: number[], currInd: number) => {
    if (row.every(x => x === 0)) {
        errIndexies.push(currInd);
    }
})

console.log("Вектора ошибок")
console.table(errors.filter((_, ind) => errIndexies.includes(ind)));
console.log("Вектора результатов")
console.table(checks.filter((_, ind) => errIndexies.includes(ind)));

// console.table(errors.map(e => checkRes(v, e, H).toArray()));
