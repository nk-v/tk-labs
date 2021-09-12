"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMatrix = void 0;
const showMatrix = (matrix, label) => {
    console.log();
    label && console.log(label + ":");
    console.table(matrix.toArray());
};
exports.showMatrix = showMatrix;
