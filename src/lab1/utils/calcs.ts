import * as math from "mathjs";
import { Data, Func, RowProceed } from ".";

export const execOnFoundRow = (
  { mtx, row, col }: Data,
  func: Func,
  type: RowProceed,
  breakAfterExecution: boolean = false
) => {
  let execFlag = false;

  const execCondition = (rowDiff: number) => {
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
  } else {
    for (let rowPrev = row - 1; rowPrev >= 0; --rowPrev) {
      execCondition(rowPrev);
    }
  }

  return execFlag;
};

export const xorRows = (mtx: math.MathArray, row: number, rowDiff: number) => {
  mtx[rowDiff] = math.bitXor(mtx[rowDiff], mtx[row]);
};

export const swapRows = (mtx: math.MathArray, row: number, rowDiff: number) => {
  [mtx[row], mtx[rowDiff]] = [mtx[rowDiff], mtx[row]];
};

export const removeZeros = (mtx: math.MathArray) => {
  mtx.forEach((value, index) => {
    if (value.every((val) => !val)) {
      mtx.splice(index, 1);
    }
  });
};
