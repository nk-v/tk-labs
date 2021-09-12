"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math = require("mathjs");
const utils_1 = require("./utils");
const a = math.matrix([
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0],
]);
(0, utils_1.showMatrix)(a, "Input A");
(0, utils_1.showMatrix)((0, utils_1.ref)(a), "Output REF(A)");
(0, utils_1.showMatrix)((0, utils_1.rref)((0, utils_1.ref)(a)), "Output RREF(REF(A))");
