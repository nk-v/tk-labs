"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rref = exports.ref = void 0;
const math = require("mathjs");
var RowProceed;
(function (RowProceed) {
    RowProceed["NEXT"] = "NEXT";
    RowProceed["PREV"] = "PREV";
})(RowProceed || (RowProceed = {}));
const execOnFoundRow = ({ mtx, row, col }, func, type, breakAfterExecution = false) => {
    let execFlag = false;
    const execCondition = (rowDiff) => {
        if (mtx[rowDiff][col]) {
            func(rowDiff);
            execFlag = true;
            if (breakAfterExecution) {
                return execFlag;
            }
        }
    };
    if (type === "NEXT") {
        for (let rowNext = row + 1; rowNext < mtx.length; ++rowNext) {
            execCondition(rowNext);
        }
    }
    else {
        for (let rowPrev = row - 1; rowPrev >= 0; --rowPrev) {
            execCondition(rowPrev);
        }
    }
    return execFlag;
};
const xorRows = (mtx, row, rowDiff) => {
    mtx[rowDiff] = math.bitXor(mtx[rowDiff], mtx[row]);
};
const swapRows = (mtx, row, rowDiff) => {
    [mtx[row], mtx[rowDiff]] = [mtx[rowDiff], mtx[row]];
};
const ref = (matrix) => {
    const [height, length] = matrix.size();
    const mtx = matrix.toArray();
    let row = 0, col = 0;
    while (row < height - 1 && col < length - 1) {
        const execWithData = (func, breakAfterExecution = false) => execOnFoundRow({ mtx, row, col }, func, RowProceed.NEXT, breakAfterExecution);
        const xorRowsWithData = (rowNext) => xorRows(mtx, row, rowNext);
        const swapRowsWithData = (rowNext) => swapRows(mtx, row, rowNext);
        if (mtx[row][col]) {
            execWithData(xorRowsWithData);
            ++row;
        }
        else {
            if (execWithData(swapRowsWithData, true)) {
                continue;
            }
        }
        ++col;
    }
    return math.matrix(mtx);
};
exports.ref = ref;
const rref = (matrix) => {
    const [height, length] = matrix.size();
    const mtx = matrix.toArray();
    let row = 1;
    for (let col = 1; col < length - 1 && row < height - 1; ++col) {
        if (mtx[row][col]) {
            const xorRowsWithData = (rowPrev) => xorRows(mtx, row, rowPrev);
            execOnFoundRow({ mtx, row, col }, xorRowsWithData, RowProceed.PREV);
            ++row;
        }
    }
    return math.matrix(mtx);
};
exports.rref = rref;
