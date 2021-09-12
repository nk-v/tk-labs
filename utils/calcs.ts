import * as math from "mathjs";

type Data = {
  mtx: math.MathArray;
  row: number;
  col: number;
};

type Func = (funcRowIndex: number) => void;

enum RowProceed {
  NEXT = "NEXT",
  PREV = "PREV",
}

const execOnFoundRow = (
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

const xorRows = (mtx: math.MathArray, row: number, rowDiff: number) => {
  mtx[rowDiff] = math.bitXor(mtx[rowDiff], mtx[row]);
};

const swapRows = (mtx: math.MathArray, row: number, rowDiff: number) => {
  [mtx[row], mtx[rowDiff]] = [mtx[rowDiff], mtx[row]];
};

export const ref = (matrix: math.Matrix) => {
  const [height, length] = matrix.size();
  const mtx = matrix.toArray();
  let row = 0,
    col = 0;
  while (row < height - 1 && col < length - 1) {
    const execWithData = (func: Func, breakAfterExecution: boolean = false) =>
      execOnFoundRow(
        { mtx, row, col },
        func,
        RowProceed.NEXT,
        breakAfterExecution
      );

    const xorRowsWithData = (rowNext: number) => xorRows(mtx, row, rowNext);
    const swapRowsWithData = (rowNext: number) => swapRows(mtx, row, rowNext);

    if (mtx[row][col]) {
      execWithData(xorRowsWithData);
      ++row;
    } else {
      if (execWithData(swapRowsWithData, true)) {
        continue;
      }
    }
    ++col;
  }
  return math.matrix(mtx);
};

export const rref = (matrix: math.Matrix) => {
  const [height, length] = matrix.size();
  const mtx = matrix.toArray();

  let row = 1;
  for (let col = 1; col < length - 1 && row < height - 1; ++col) {
    if (mtx[row][col]) {
      const xorRowsWithData = (rowPrev: number) => xorRows(mtx, row, rowPrev);
      execOnFoundRow({ mtx, row, col }, xorRowsWithData, RowProceed.PREV);
      ++row;
    }
  }

  return math.matrix(mtx);
};
