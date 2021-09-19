import * as math from "mathjs";
import {
  execOnFoundRow,
  Func,
  swapRows,
  xorRows,
  RowProceed,
  removeZeros,
} from "../../utils";

export const ref = (matrix: math.Matrix) => {
  const [height, length] = matrix.size();
  const mtx = matrix.toArray();
  let row = 0,
    col = 0;
  while (row < height && col < length) {
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
  removeZeros(mtx);
  return math.matrix(mtx);
};
